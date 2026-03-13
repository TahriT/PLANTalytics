"""
merge_zenodo_data.py
--------------------
Parses the Zenodo "Plants database" HTML export and merges it with the
existing docs/plant_data.csv.

- Zenodo columns are prefixed with ``zn_`` so the data source is always clear.
- Plants are matched on exact scientific name (case-insensitive).
- Matched rows get the new ``zn_*`` columns filled in and ``sources`` updated.
- Unmatched Zenodo plants are appended as new rows at the end.

Run:
    python merge_zenodo_data.py
"""

import csv
import os
import re
import shutil
from bs4 import BeautifulSoup

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ZENODO_HTML = os.path.join(SCRIPT_DIR, "docs", "Plants database b5a880c30b2f4c1.html")
PLANT_CSV = os.path.join(SCRIPT_DIR, "docs", "plant_data.csv")
BACKUP_CSV = os.path.join(SCRIPT_DIR, "plant_data_pre_zenodo_backup.csv")

# Zenodo field names → prefixed column names
ZENODO_PREFIX = "zn_"

# ── helpers ────────────────────────────────────────────────────────────────────

def parse_zenodo_html(path):
    """Return (field_names, list[dict]) from the transposed HTML table."""
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    table = soup.find("table")
    rows = table.find_all("tr")

    # Row 1 (first data row) holds the field names as cell values
    field_names = [c.get_text(strip=True) for c in rows[1].find_all("td")]

    plants = []
    for row in rows[2:]:
        cells = [c.get_text(strip=True) for c in row.find_all("td")]
        record = {}
        for fname, val in zip(field_names, cells):
            if fname:  # skip empty-named columns
                record[fname] = val
        if record.get("name"):
            plants.append(record)

    return field_names, plants


def make_zenodo_key(name):
    """Normalise a Zenodo ``name`` for matching (lowercase, collapse spaces)."""
    return re.sub(r"\s+", " ", name.strip()).lower()


def make_existing_key(genus, species):
    """Build the same key from existing CSV Genus+Species."""
    return re.sub(r"\s+", " ", f"{genus} {species}".strip()).lower()


def add_source(current, tag="zenodo"):
    """Append *tag* to a ``+``-separated sources string if not already there."""
    parts = [s.strip() for s in current.split("+") if s.strip()]
    if tag not in parts:
        parts.append(tag)
    return "+".join(parts)


# ── main ───────────────────────────────────────────────────────────────────────

def main():
    # 1. Parse Zenodo
    print("[zenodo] Parsing HTML …")
    field_names, zenodo_plants = parse_zenodo_html(ZENODO_HTML)
    # Filter field_names to non-empty
    field_names = [f for f in field_names if f]
    zn_columns = [f"{ZENODO_PREFIX}{f}" for f in field_names]
    print(f"[zenodo] Found {len(zenodo_plants)} plants, {len(field_names)} fields")

    # 2. Read existing CSV
    print("[csv] Reading existing plant_data.csv …")
    with open(PLANT_CSV, "r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        existing_fields = list(reader.fieldnames)
        existing_rows = list(reader)
    print(f"[csv] {len(existing_rows)} existing rows, {len(existing_fields)} columns")

    # 3. Backup
    shutil.copy2(PLANT_CSV, BACKUP_CSV)
    print(f"[csv] Backup saved → {BACKUP_CSV}")

    # 4. Build lookup of existing rows by scientific name key
    key_to_idx = {}
    for idx, row in enumerate(existing_rows):
        key = make_existing_key(row.get("Genus", ""), row.get("Species", ""))
        if key and key not in key_to_idx:
            key_to_idx[key] = idx

    # 5. Determine output field order (existing + new zn_ columns)
    new_columns = [c for c in zn_columns if c not in existing_fields]
    output_fields = existing_fields + new_columns

    # Ensure every existing row has placeholders for new columns
    for row in existing_rows:
        for col in new_columns:
            row.setdefault(col, "")

    # 6. Merge
    matched = 0
    added = 0
    seen_keys = set()

    for zplant in zenodo_plants:
        zkey = make_zenodo_key(zplant.get("name", ""))
        if not zkey or zkey in seen_keys:
            continue
        seen_keys.add(zkey)

        # Build the zn_ dict for this plant
        zn_data = {}
        for fname in field_names:
            zn_data[f"{ZENODO_PREFIX}{fname}"] = zplant.get(fname, "")

        if zkey in key_to_idx:
            # ── matched: enrich existing row ──
            idx = key_to_idx[zkey]
            for col, val in zn_data.items():
                existing_rows[idx][col] = val
            existing_rows[idx]["sources"] = add_source(
                existing_rows[idx].get("sources", ""), "zenodo"
            )
            matched += 1
        else:
            # ── new plant: create a stub row ──
            new_row = {col: "" for col in output_fields}
            # Fill zn_ columns
            for col, val in zn_data.items():
                new_row[col] = val
            # Also populate the core identifying columns from Zenodo
            parts = zplant["name"].split(None, 1)
            new_row["Genus"] = parts[0] if parts else ""
            new_row["Species"] = parts[1] if len(parts) > 1 else ""
            new_row["CommonName"] = zplant.get("commonName", "")
            new_row["Family"] = zplant.get("Family", "")
            new_row["sources"] = "zenodo"
            existing_rows.append(new_row)
            added += 1

    print(f"[merge] {matched} matched (enriched), {added} new plants added")
    print(f"[merge] Total rows: {len(existing_rows)}, Total columns: {len(output_fields)}")

    # 7. Write output
    with open(PLANT_CSV, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=output_fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(existing_rows)
    print(f"[done] Written → {PLANT_CSV}")


if __name__ == "__main__":
    main()
