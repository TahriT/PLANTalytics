#!/usr/bin/env python3
"""
translate_plant_names.py  —  Fetch multilingual plant common names from Wikidata

Reads plant_data.csv, extracts unique scientific names (Genus + Species),
queries the Wikidata SPARQL endpoint for common names in all PLANTalytics
target languages, and outputs docs/plant_names_i18n.json.

Wikidata property used:
  P1843  — "taxon common name"   (vernacular names in many languages)

Fallback: Wikipedia article titles via sitelinks (e.g., de.wikipedia label)

Usage:
    python translate_plant_names.py                 # full run, all plants
    python translate_plant_names.py --sample 50     # test with 50 plants
    python translate_plant_names.py --resume        # resume from checkpoint
"""

import csv, json, sys, time, argparse, os
from pathlib import Path

try:
    import requests
except ImportError:
    print("Installing requests...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
    import requests

# ── Config ──
LANGUAGES = ["en", "es", "fr", "de", "pt", "ja", "zh", "hi", "te"]
WIKIDATA_SPARQL = "https://query.wikidata.org/sparql"
BATCH_SIZE = 80           # scientific names per SPARQL query (Wikidata limit-friendly)
DELAY_BETWEEN_BATCHES = 2  # seconds, be polite to Wikidata
CHECKPOINT_FILE = "plant_names_checkpoint.json"

CSV_PATH = Path(__file__).parent / "docs" / "plant_data.csv"
OUTPUT_PATH = Path(__file__).parent / "docs" / "plant_names_i18n.json"

HEADERS = {
    "User-Agent": "PLANTalytics-Translator/1.0 (https://github.com/PLANTalytics; bot for plant name i18n)",
    "Accept": "application/sparql-results+json",
}


def load_scientific_names(csv_path: Path) -> list[str]:
    """Extract unique 'Genus Species' strings from the CSV."""
    names = set()
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            genus = (row.get("Genus") or "").strip()
            species = (row.get("Species") or "").strip()
            if genus and species:
                names.add(f"{genus} {species}")
    return sorted(names)


def build_sparql_query(sci_names: list[str]) -> str:
    """
    Build a SPARQL query that fetches:
      1. P1843 (taxon common name) labels in target languages
      2. Wikipedia sitelink labels as fallback
    for a batch of scientific names.
    """
    # Build VALUES clause with scientific names
    values = " ".join(f'"{name}"' for name in sci_names)
    
    lang_filter = " ".join(f'"{l}"' for l in LANGUAGES)

    query = f"""
    SELECT ?sciName ?lang ?commonName WHERE {{
      VALUES ?sciName {{ {values} }}
      ?taxon wdt:P225 ?sciName .
      
      # Method 1: taxon common name (P1843)
      {{
        ?taxon wdt:P1843 ?commonName .
        BIND(LANG(?commonName) AS ?lang)
        FILTER(LANG(?commonName) IN ({", ".join(f'"{l}"' for l in LANGUAGES)}))
      }}
      UNION
      # Method 2: Wikipedia sitelink labels
      {{
        VALUES ?langCode {{ {" ".join(f'"{l}"' for l in LANGUAGES)} }}
        ?sitelink schema:about ?taxon ;
                  schema:isPartOf [ wikibase:wikiGroup "wikipedia" ] ;
                  schema:inLanguage ?langCode ;
                  schema:name ?commonName .
        BIND(?langCode AS ?lang)
      }}
    }}
    """
    return query


def query_wikidata(sparql: str) -> list[dict]:
    """Execute a SPARQL query against Wikidata and return results."""
    resp = requests.get(
        WIKIDATA_SPARQL,
        params={"query": sparql, "format": "json"},
        headers=HEADERS,
        timeout=60,
    )
    
    if resp.status_code == 429:
        # Rate limited — wait and retry
        wait = int(resp.headers.get("Retry-After", 30))
        print(f"  ⏳ Rate limited, waiting {wait}s...")
        time.sleep(wait)
        return query_wikidata(sparql)
    
    resp.raise_for_status()
    data = resp.json()
    return data.get("results", {}).get("bindings", [])


def process_results(bindings: list[dict], translations: dict):
    """Merge SPARQL results into the translations dict."""
    for row in bindings:
        sci_name = row["sciName"]["value"]
        lang = row["lang"]["value"]
        name = row["commonName"]["value"]
        
        # Normalize: take the shortest/simplest name (avoid Wikipedia disambiguation)
        name = name.split(" (")[0].strip()  # Remove disambiguation like " (plant)"
        
        if sci_name not in translations:
            translations[sci_name] = {}
        
        # Prefer P1843 (taxon common name) over sitelink; keep first found
        if lang not in translations[sci_name]:
            translations[sci_name][lang] = name
        else:
            # Keep the shorter one (usually more colloquial)
            existing = translations[sci_name][lang]
            if len(name) < len(existing):
                translations[sci_name][lang] = name


def save_checkpoint(translations: dict, processed_count: int):
    """Save progress to a checkpoint file."""
    checkpoint = {
        "processed_count": processed_count,
        "translations": translations,
    }
    with open(CHECKPOINT_FILE, "w", encoding="utf-8") as f:
        json.dump(checkpoint, f, ensure_ascii=False, indent=1)


def load_checkpoint() -> tuple[dict, int]:
    """Load checkpoint if it exists."""
    if os.path.exists(CHECKPOINT_FILE):
        with open(CHECKPOINT_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("translations", {}), data.get("processed_count", 0)
    return {}, 0


def save_output(translations: dict, sci_name_to_common: dict):
    """
    Save the final JSON output. Structure:
    {
      "Quercus robur": { "en": "English Oak", "es": "Roble común", "de": "Stieleiche", ... },
      ...
    }
    Also includes the English CommonName from the CSV as the 'en' entry.
    """
    # Merge CSV English names as authoritative 'en' values
    for sci_name, en_common in sci_name_to_common.items():
        if sci_name not in translations:
            translations[sci_name] = {}
        # CSV English name takes priority
        if en_common:
            translations[sci_name]["en"] = en_common

    # Only keep entries that have at least one non-English translation
    useful = {}
    for sci_name, langs in translations.items():
        non_en = {k: v for k, v in langs.items() if k != "en"}
        if non_en:
            useful[sci_name] = langs

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(useful, f, ensure_ascii=False, indent=1)

    print(f"\n✅ Saved {len(useful)} translated plants to {OUTPUT_PATH}")
    print(f"   Coverage by language:")
    for lang in LANGUAGES:
        count = sum(1 for v in useful.values() if lang in v)
        pct = count / len(useful) * 100 if useful else 0
        print(f"     {lang}: {count:>5} ({pct:.1f}%)")


def build_common_name_map(csv_path: Path) -> dict:
    """Map 'Genus Species' → CommonName from CSV."""
    mapping = {}
    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            genus = (row.get("Genus") or "").strip()
            species = (row.get("Species") or "").strip()
            common = (row.get("CommonName") or "").strip()
            if genus and species:
                key = f"{genus} {species}"
                if key not in mapping or (common and not mapping[key]):
                    mapping[key] = common
    return mapping


def main():
    parser = argparse.ArgumentParser(description="Fetch multilingual plant names from Wikidata")
    parser.add_argument("--sample", type=int, default=0, help="Only process N plants (for testing)")
    parser.add_argument("--resume", action="store_true", help="Resume from checkpoint")
    args = parser.parse_args()

    print("🌱 PLANTalytics Plant Name Translator")
    print(f"   Languages: {', '.join(LANGUAGES)}")
    print(f"   Source: {CSV_PATH}")
    print()

    # Load scientific names
    sci_names = load_scientific_names(CSV_PATH)
    print(f"📋 Found {len(sci_names)} unique scientific names")

    # Build English common name map
    common_map = build_common_name_map(CSV_PATH)

    if args.sample > 0:
        sci_names = sci_names[:args.sample]
        print(f"   (sampling {args.sample} for testing)")

    # Resume from checkpoint?
    translations = {}
    start_idx = 0
    if args.resume:
        translations, start_idx = load_checkpoint()
        if start_idx > 0:
            print(f"♻️  Resuming from checkpoint: {start_idx} already processed, {len(translations)} translations")

    # Process in batches
    total = len(sci_names)
    batch_num = 0
    
    for i in range(start_idx, total, BATCH_SIZE):
        batch = sci_names[i : i + BATCH_SIZE]
        batch_num += 1
        pct = min(100, (i + len(batch)) / total * 100)
        print(f"  [{pct:5.1f}%] Batch {batch_num}: querying {len(batch)} plants ({i+1}–{i+len(batch)} of {total})...", end=" ", flush=True)

        try:
            sparql = build_sparql_query(batch)
            results = query_wikidata(sparql)
            process_results(results, translations)
            
            found = sum(1 for name in batch if name in translations)
            print(f"→ {len(results)} results, {found}/{len(batch)} plants matched")
            
        except requests.exceptions.RequestException as e:
            print(f"⚠️  Error: {e}")
            # Save checkpoint on error
            save_checkpoint(translations, i)
            print(f"   Checkpoint saved at position {i}. Re-run with --resume to continue.")
            if "429" not in str(e):
                time.sleep(5)  # Brief pause before continuing
                continue
            else:
                break

        # Checkpoint every 10 batches
        if batch_num % 10 == 0:
            save_checkpoint(translations, i + len(batch))

        if i + BATCH_SIZE < total:
            time.sleep(DELAY_BETWEEN_BATCHES)

    # Save final output
    save_output(translations, common_map)
    
    # Clean up checkpoint
    if os.path.exists(CHECKPOINT_FILE):
        os.remove(CHECKPOINT_FILE)
        print("🧹 Checkpoint file cleaned up")

    print("\n🎉 Done! Plant name translations ready.")


if __name__ == "__main__":
    main()
