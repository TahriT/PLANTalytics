import requests
import csv
from dotenv import load_dotenv
import os
import time

# Load environment variables from .env file
load_dotenv()

# Access secrets from the environment
KEY_ID = os.getenv("PERMAPEOPLE_ID")
KEY_SECRET = os.getenv("PERMAPEOPLE_SECRET")

# API endpoint and authentication headers
API_URL = "https://permapeople.org/api/plants"
HEADERS = {
    "x-permapeople-key-id": KEY_ID,
    "x-permapeople-key-secret": KEY_SECRET,
    "Content-Type": "application/json"
}

# Define reference columns based on the Contribution Guide
REFERENCE_COLUMNS = [
    "id", "name", "latin_name", "family", "synonyms", "edible_parts",
    "medicinal_parts", "uses", "toxicity", "growth_habit",
    "height", "spread", "growth_rate", "hardiness_zone",
    "sun_requirements", "water_requirements", "soil_requirements",
    "propagation_methods", "harvest_time", "bloom_time",
    "seed_viability", "preferred_climates", "ecosystem_services",
    "pollinators", "invasive_potential", "companion_planting",
    "pests_diseases", "notes"
]

# Function to process range values (e.g., "6.0-6.5")
def parse_range(value):
    try:
        parts = value.split("-")
        min_value = float(parts[0]) if parts[0] else None
        max_value = float(parts[1]) if len(parts) > 1 else None
        return min_value, max_value
    except (ValueError, IndexError):
        return None, None

# Function to fetch data from the API using last_id for pagination
def fetch_api_data(last_id, headers):
    params = {"last_id": last_id} if last_id else {}
    try:
        response = requests.get(API_URL, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Function to save data to a CSV file
def save_to_csv(data, filename):
    if not data:
        print("No data to write to CSV.")
        return

    # Prepare rows and keys
    rows = []
    keys_with_types = {}

    for plant in data:
        # Flatten the main plant record (excluding 'data' key for now)
        plant_details = {k: plant[k] for k in plant if k != 'data'}
        
        # Flatten the 'data' key which contains multiple dictionaries
        data_details = {}
        if 'data' in plant:
            for data_item in plant['data']:
                key = data_item.get('key', '').strip().lower().replace(" ", "_")  # Normalize keys
                value = data_item.get('value', '')

                # Check for range-like values and handle them
                if "-" in value and key in {"soil_ph", "height", "width"}:  # Add other range keys as needed
                    min_value, max_value = parse_range(value)
                    data_details[f"{key}_min"] = min_value
                    data_details[f"{key}_max"] = max_value
                else:
                    data_details[key] = value

        # Merge plant details and data details
        full_record = {**plant_details, **data_details}
        
        # Track all keys for the header
        for key in full_record.keys():
            keys_with_types[key] = ""  # Leave types as empty for now

        # Prepare row for CSV
        rows.append(full_record)

    # Writing to CSV
    try:
        with open(filename, mode="w", newline="", encoding="utf-8") as file:
            # Create header from all keys
            header = list(keys_with_types.keys())
            writer = csv.DictWriter(file, fieldnames=header)
            writer.writeheader()
            writer.writerows(rows)

        print(f"Data successfully written to {filename}")
    except Exception as e:
        print(f"Error writing to CSV: {e}")

def main():
    all_plants = []  # To collect all plants across multiple batches
    last_id = None  # Start without a last_id

    while True:
        print(f"Fetching data starting after ID {last_id}...")
        response = fetch_api_data(last_id, HEADERS)

        if response and 'plants' in response:
            plants = response['plants']
            if not plants:  # No more data to fetch
                break
            all_plants.extend(plants)  # Add fetched plants to the list
            
            # Update last_id to the ID of the last plant fetched
            last_id = plants[-1]["id"]
            time.sleep(1)  # Respectful delay between requests
        else:
            print("No more data or error occurred.")
            break
    
    if all_plants:
        print(f"Fetched {len(all_plants)} records.")
        output_filename = "permapeople_plants_expanded.csv"
        print("Saving expanded data to CSV...")
        save_to_csv(all_plants, output_filename)
    else:
        print("No records found or failed to fetch data.")

if __name__ == "__main__":
    main()
