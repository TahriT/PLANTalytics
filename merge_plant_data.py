"""
merge_plant_data.py
-------------------
Pulls the latest data from Permapeople API, merges it with the existing PFAF
CSV, deduplicates on latin name, fills gaps across sources, and writes the
combined dataset to docs/plant_data.csv (and a local backup copy).

Run:
    python merge_plant_data.py

Options (env vars):
    SKIP_FETCH=1   – skip re-fetching from Permapeople (use existing CSV)
"""

import csv
import os
import re
import shutil
import time
import sys

from dotenv import load_dotenv
import requests

load_dotenv()

# ── paths ──────────────────────────────────────────────────────────────────────
SCRIPT_DIR       = os.path.dirname(os.path.abspath(__file__))
PFAF_CSV         = os.path.join(SCRIPT_DIR, "docs", "plant_data.csv")
PP_CSV           = os.path.join(SCRIPT_DIR, "permapeople_plants_expanded.csv")
OUTPUT_CSV       = os.path.join(SCRIPT_DIR, "docs", "plant_data.csv")
OUTPUT_BACKUP    = os.path.join(SCRIPT_DIR, "plant_data_combined_backup.csv")

# ── Permapeople API ────────────────────────────────────────────────────────────
PP_API_URL = "https://permapeople.org/api/plants"
PP_HEADERS = {
    "x-permapeople-key-id":     os.getenv("PERMAPEOPLE_ID", ""),
    "x-permapeople-key-secret": os.getenv("PERMAPEOPLE_SECRET", ""),
    "Content-Type": "application/json",
}


# ══════════════════════════════════════════════════════════════════════════════
#  1.  FETCH  –  pull latest from Permapeople
# ══════════════════════════════════════════════════════════════════════════════

def fetch_permapeople():
    """Paginate through Permapeople API and write PP_CSV."""
    if os.environ.get("SKIP_FETCH") == "1":
        print("[permapeople] SKIP_FETCH=1 – using existing CSV")
        return

    if not PP_HEADERS["x-permapeople-key-id"]:
        print("[permapeople] No API credentials found – using existing CSV")
        return

    print("[permapeople] Fetching latest data …")
    all_plants = []
    last_id = None

    while True:
        params = {"last_id": last_id} if last_id else {}
        try:
            r = requests.get(PP_API_URL, headers=PP_HEADERS, params=params, timeout=30)
            r.raise_for_status()
            data = r.json()
        except Exception as e:
            print(f"  [!] Request error: {e}")
            break

        plants = data.get("plants", [])
        if not plants:
            break

        all_plants.extend(plants)
        last_id = plants[-1]["id"]
        print(f"  fetched {len(all_plants)} records so far …", end="\r")
        time.sleep(0.8)

    if not all_plants:
        print("[permapeople] No records – using existing CSV")
        return

    print(f"\n[permapeople] {len(all_plants)} records fetched. Writing CSV …")
    _write_pp_csv(all_plants)
    print(f"[permapeople] Saved → {PP_CSV}")


def _write_pp_csv(plants):
    rows = []
    all_keys = {}

    for plant in plants:
        record = {k: plant[k] for k in plant if k != "data"}
        if "data" in plant:
            for item in plant["data"]:
                key = item.get("key", "").strip().lower().replace(" ", "_")
                value = item.get("value", "")
                if "-" in str(value) and key in {"soil_ph", "height", "width", "usda_hardiness_zone"}:
                    try:
                        parts = value.split("-")
                        record[f"{key}_min"] = float(parts[0]) if parts[0] else ""
                        record[f"{key}_max"] = float(parts[1]) if len(parts) > 1 else ""
                    except ValueError:
                        record[key] = value
                else:
                    record[key] = value
        for k in record:
            all_keys[k] = ""
        rows.append(record)

    with open(PP_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(all_keys))
        writer.writeheader()
        writer.writerows(rows)


# ══════════════════════════════════════════════════════════════════════════════
#  2.  LOAD  –  read both CSVs into dicts keyed by normalised latin name
# ══════════════════════════════════════════════════════════════════════════════

def norm(name: str) -> str:
    """Lowercase, collapse whitespace, strip."""
    return re.sub(r"\s+", " ", str(name).strip().lower())


def load_pfaf(path) -> dict:
    records = {}
    if not os.path.exists(path):
        print(f"[pfaf] CSV not found: {path}")
        return records
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            genus   = row.get("Genus", "").strip()
            species = row.get("Species", "").strip()
            latin   = norm(f"{genus} {species}")
            if latin and latin != " ":
                records[latin] = dict(row)
    print(f"[pfaf] Loaded {len(records)} records from {path}")
    return records


def load_permapeople(path) -> dict:
    records = {}
    if not os.path.exists(path):
        print(f"[permapeople] CSV not found: {path}")
        return records
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            latin = norm(row.get("scientific_name") or row.get("name") or "")
            if latin:
                records[latin] = dict(row)
    print(f"[permapeople] Loaded {len(records)} records from {path}")
    return records


# ══════════════════════════════════════════════════════════════════════════════
#  3.  MERGE  –  combine the two dicts
# ══════════════════════════════════════════════════════════════════════════════

# Maps Permapeople field → PFAF field (used to fill PFAF blanks from PP)
PP_TO_PFAF = {
    "name":                    "CommonName",
    "family":                  "Family",
    "genus":                   "Genus",
    "growth":                  "GrowthRate",
    "usda_hardiness_zone":     "HardinessZones",
    "height":                  "Height",
    "width":                   "Width",
    "life_cycle":              "Type",
    "pollination":             "Pollinators",
    "habitat":                 "Habitat",
    "medicinal":               "Medicinal",
    "edible_uses":             "Edibility",
    "soil_type":               "Soils",
    "soil_ph":                 "pH",
    "images":                  "Image URL",
}

# Extra PP columns to carry through with a pp_ prefix
PP_EXTRA = [
    "id", "slug", "description", "link", "scientific_name",
    "layer", "life_cycle", "light_requirement", "water_requirement",
    "height_min", "height_max", "width_min", "width_max",
    "soil_ph_min", "soil_ph_max",
    "usda_hardiness_zone_min", "usda_hardiness_zone_max",
    "edible_parts", "edible_uses", "edible", "utility",
    "nitrogen_fixing", "drought_resistant", "invasive",
    "root_type", "root_depth", "color", "fruit_type",
    "native_to", "introduced_into",
    "propagation_method", "seed_viability",
    "pests", "diseases", "warning",
    "wikipedia", "plants_for_a_future", "plants_of_the_world_online",
]


def merge(pfaf: dict, pp: dict) -> list[dict]:
    """
    Strategy:
    - Start with every PFAF record; fill blank PFAF fields from PP equivalents.
    - Append any PP-only records (not in PFAF at all).
    - Add pp_* columns to every row for the extra Permapeople fields.
    """
    combined = []

    for latin, prow in pfaf.items():
        merged = dict(prow)
        merged["sources"] = "pfaf"

        pp_record = pp.get(latin)
        if pp_record:
            merged["sources"] = "pfaf+permapeople"
            # Fill PFAF blanks from PP equivalents
            for pp_col, pfaf_col in PP_TO_PFAF.items():
                if not merged.get(pfaf_col) and pp_record.get(pp_col):
                    merged[pfaf_col] = pp_record[pp_col]
            # Carry extra PP columns
            for col in PP_EXTRA:
                merged[f"pp_{col}"] = pp_record.get(col, "")
        else:
            for col in PP_EXTRA:
                merged[f"pp_{col}"] = ""

        combined.append(merged)

    # PP-only records (not matched to any PFAF entry)
    pfaf_keys = set(pfaf.keys())
    pp_only = {k: v for k, v in pp.items() if k not in pfaf_keys}
    print(f"[merge] {len(pp_only)} Permapeople-only records (not in PFAF)")

    for latin, pp_record in pp_only.items():
        row = {
            "Family":        pp_record.get("family", ""),
            "Genus":         pp_record.get("genus", ""),
            "Species":       " ".join(norm(pp_record.get("scientific_name", "")).split()[1:]),
            "CommonName":    pp_record.get("name", ""),
            "GrowthRate":    pp_record.get("growth", ""),
            "HardinessZones":pp_record.get("usda_hardiness_zone", ""),
            "Height":        pp_record.get("height", ""),
            "Width":         pp_record.get("width", ""),
            "Type":          pp_record.get("life_cycle", ""),
            "Foliage":       "",
            "Pollinators":   pp_record.get("pollination", ""),
            "Leaf":          "",
            "Flower":        "",
            "Ripen":         "",
            "Reproduction":  pp_record.get("propagation_method", ""),
            "Soils":         pp_record.get("soil_type", ""),
            "pH":            pp_record.get("soil_ph", ""),
            "pH_split":      "",
            "Preferences":   "",
            "Tolerances":    pp_record.get("drought_resistant", ""),
            "Habitat":       pp_record.get("habitat", ""),
            "HabitatRange":  "",
            "Edibility":     pp_record.get("edible_uses", "") or pp_record.get("edible", ""),
            "Medicinal":     pp_record.get("medicinal", ""),
            "OtherUses":     pp_record.get("utility", ""),
            "PFAF":          pp_record.get("plants_for_a_future", ""),
            "Image URL":     pp_record.get("images", ""),
            "sources":       "permapeople",
        }
        for col in PP_EXTRA:
            row[f"pp_{col}"] = pp_record.get(col, "")
        combined.append(row)

    return combined


# ══════════════════════════════════════════════════════════════════════════════
#  4.  WRITE
# ══════════════════════════════════════════════════════════════════════════════

def write_csv(rows: list[dict], path: str):
    if not rows:
        print("[write] No rows to write.")
        return

    # Union of all keys, PFAF columns first
    pfaf_cols = [
        "Family", "Genus", "Species", "CommonName", "GrowthRate",
        "HardinessZones", "Height", "Width", "Type", "Foliage",
        "Pollinators", "Leaf", "Flower", "Ripen", "Reproduction",
        "Soils", "pH", "pH_split", "Preferences", "Tolerances",
        "Habitat", "HabitatRange", "Edibility", "Medicinal",
        "OtherUses", "PFAF", "Image URL", "sources",
    ]
    pp_cols = sorted({k for row in rows for k in row if k and k.startswith("pp_")})
    fieldnames = pfaf_cols + pp_cols

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

    size_mb = os.path.getsize(path) / 1_048_576
    print(f"[write] {len(rows)} rows → {path}  ({size_mb:.2f} MB)")


# ══════════════════════════════════════════════════════════════════════════════
#  main
# ══════════════════════════════════════════════════════════════════════════════

def main():
    print("=" * 60)
    print("  PLANTalytics – merge_plant_data.py")
    print("=" * 60)

    # 1. Pull latest Permapeople data
    fetch_permapeople()

    # 2. Load both sources
    pfaf = load_pfaf(PFAF_CSV)
    pp   = load_permapeople(PP_CSV)

    if not pfaf and not pp:
        print("[!] Both sources empty – nothing to do.")
        sys.exit(1)

    # 3. Merge
    rows = merge(pfaf, pp)
    total = len(rows)
    pfaf_only  = sum(1 for r in rows if r.get("sources") == "pfaf")
    both       = sum(1 for r in rows if r.get("sources") == "pfaf+permapeople")
    pp_only    = sum(1 for r in rows if r.get("sources") == "permapeople")
    print(f"[merge] {total} total plants  |  {both} matched both  |"
          f"  {pfaf_only} PFAF-only  |  {pp_only} PP-only")

    # 4. Write output
    write_csv(rows, OUTPUT_CSV)

    # Also save a timestamped backup next to the script
    shutil.copy(OUTPUT_CSV, OUTPUT_BACKUP)
    print(f"[backup] Saved → {OUTPUT_BACKUP}")
    print("\nDone ✓")


if __name__ == "__main__":
    main()
