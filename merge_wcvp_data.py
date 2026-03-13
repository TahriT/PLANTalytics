"""
merge_wcvp_data.py
------------------
Enriches the existing docs/plant_data.csv with data from the World Checklist
of Vascular Plants (WCVP) — Kew's authoritative taxonomic backbone.

Adds ``kew_``-prefixed columns for:
  - lifeform, climate, geographic_area, taxon_authors, first_published
  - powo_id (links to Plants of the World Online)
  - native_range / introduced_range (aggregated from distribution file)

Only enriches plants already in the dataset (no new rows added).
Matches on exact genus+species (case-insensitive, accepted taxa only).

Run:
    python merge_wcvp_data.py
"""

import csv
import os
import re
import shutil
from collections import defaultdict

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WCVP_NAMES = os.path.join(SCRIPT_DIR, "docs", "wcvp_names.csv")
WCVP_DIST  = os.path.join(SCRIPT_DIR, "docs", "wcvp_distribution.csv")
PLANT_CSV  = os.path.join(SCRIPT_DIR, "docs", "plant_data.csv")
BACKUP_CSV = os.path.join(SCRIPT_DIR, "plant_data_pre_wcvp_backup.csv")

KEW_PREFIX = "kew_"

# Columns we pull from WCVP Names
NAME_FIELDS = [
    "lifeform_description",
    "climate_description",
    "geographic_area",
    "taxon_authors",
    "first_published",
    "powo_id",
]

# ── helpers ────────────────────────────────────────────────────────────────────

def make_key(genus, species):
    return re.sub(r"\s+", " ", f"{genus} {species}".strip()).lower()


def add_source(current, tag="kew"):
    parts = [s.strip() for s in current.split("+") if s.strip()]
    if tag not in parts:
        parts.append(tag)
    return "+".join(parts)


# ── main ───────────────────────────────────────────────────────────────────────

def main():
    # 1. Read existing CSV to know which genus+species keys we need
    print("[csv] Reading existing plant_data.csv …")
    with open(PLANT_CSV, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        existing_fields = list(reader.fieldnames)
        existing_rows = list(reader)
    print(f"[csv] {len(existing_rows)} rows, {len(existing_fields)} columns")

    # Build lookup: key → list of row indices (some plants share genus+species)
    key_to_idxs = defaultdict(list)
    for idx, row in enumerate(existing_rows):
        key = make_key(row.get("Genus", ""), row.get("Species", ""))
        if key:
            key_to_idxs[key].append(idx)

    needed_keys = set(key_to_idxs.keys())
    print(f"[csv] {len(needed_keys)} unique genus+species keys to match")

    # 2. Scan WCVP Names for accepted species that match our plants
    print("[wcvp] Scanning wcvp_names.csv for matches …")
    wcvp_matches = {}  # key → {field: value, plant_name_id: ...}
    matched_ids = set()

    with open(WCVP_NAMES, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        for row in reader:
            if row["taxon_rank"] != "Species" or row["taxon_status"] != "Accepted":
                continue
            key = make_key(row["genus"], row["species"])
            if key in needed_keys and key not in wcvp_matches:
                data = {field: row.get(field, "") for field in NAME_FIELDS}
                data["plant_name_id"] = row["plant_name_id"]
                wcvp_matches[key] = data
                matched_ids.add(row["plant_name_id"])

    print(f"[wcvp] {len(wcvp_matches)} species matched from names file")

    # 3. Aggregate distribution for matched plant_name_ids
    print("[wcvp] Scanning wcvp_distribution.csv for matched plants …")
    native_ranges = defaultdict(list)     # plant_name_id → [area, ...]
    introduced_ranges = defaultdict(list)

    with open(WCVP_DIST, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        for row in reader:
            pid = row["plant_name_id"]
            if pid not in matched_ids:
                continue
            area = row.get("area", "").strip()
            if not area:
                continue
            extinct_flag = row.get("extinct", "0") == "1"
            if extinct_flag:
                continue  # skip extinct distributions
            if row.get("introduced", "0") == "1":
                introduced_ranges[pid].append(area)
            else:
                native_ranges[pid].append(area)

    dist_count = sum(1 for pid in matched_ids
                     if pid in native_ranges or pid in introduced_ranges)
    print(f"[wcvp] Distribution found for {dist_count} plants")

    # 4. Backup
    shutil.copy2(PLANT_CSV, BACKUP_CSV)
    print(f"[csv] Backup → {BACKUP_CSV}")

    # 5. Build new column list
    kew_columns = [f"{KEW_PREFIX}{f}" for f in NAME_FIELDS]
    kew_columns.append(f"{KEW_PREFIX}native_range")
    kew_columns.append(f"{KEW_PREFIX}introduced_range")
    new_columns = [c for c in kew_columns if c not in existing_fields]
    output_fields = existing_fields + new_columns

    # Ensure every existing row has placeholders
    for row in existing_rows:
        for col in new_columns:
            row.setdefault(col, "")

    # 6. Enrich matched rows
    enriched = 0
    for key, data in wcvp_matches.items():
        pid = data["plant_name_id"]

        # Build kew_ values
        kew_data = {}
        for field in NAME_FIELDS:
            kew_data[f"{KEW_PREFIX}{field}"] = data.get(field, "")

        # Aggregate distributions as semicolon-separated lists
        native = native_ranges.get(pid, [])
        introduced = introduced_ranges.get(pid, [])
        kew_data[f"{KEW_PREFIX}native_range"] = "; ".join(sorted(set(native)))
        kew_data[f"{KEW_PREFIX}introduced_range"] = "; ".join(sorted(set(introduced)))

        for idx in key_to_idxs.get(key, []):
            for col, val in kew_data.items():
                existing_rows[idx][col] = val
            existing_rows[idx]["sources"] = add_source(
                existing_rows[idx].get("sources", ""), "kew"
            )
            enriched += 1

    print(f"[merge] {enriched} rows enriched with Kew data")
    print(f"[merge] Total columns: {len(output_fields)}")

    # 7. Write output
    with open(PLANT_CSV, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=output_fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(existing_rows)
    print(f"[done] Written → {PLANT_CSV}")


if __name__ == "__main__":
    main()
