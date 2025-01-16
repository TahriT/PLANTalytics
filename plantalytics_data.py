#####################################

"""
Web Scraper for pfaf.org V1.2

This script scrapes plant data from the Plants For A Future (PFAF) database.
The data includes various attributes such as Latin Name, Common Name, Habit, Height, etc.



Author:
-------
Tahri Turner
https://github.com/TahriT/PLANTalytics
Date:5/22/2024
-------

"""

#####################################
import requests
from bs4 import BeautifulSoup
import re
import csv
import concurrent.futures

attributes = [
    "Family", "Genus", "Species", "CommonName", "GrowthRate", "HardinessZones",
    "Height", "Width", "Type", "Foliage", "Pollinators", "Leaf", "Flower", "Ripen", "Reproduction", "Soils",
    "pH", "pH_split", "Preferences", "Tolerances", "Habitat", "HabitatRange",
    "Edibility", "Medicinal", "OtherUses", "PFAF", "Image URL"
]

def get_plant_info(genus, species=""):
    pfaf_url = f"https://pfaf.org/user/Plant.aspx?LatinName={genus}+{species}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    }
    response = requests.get(pfaf_url, headers=headers)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    description = soup.find("meta", id="description")['content']
    description_list = description.split()

    # Extracting characteristics
    plant_type, foliage, height, width, growth_rate = None, None, None, None, ""
    try:
        type_idx = description_list.index("is") + 2
        growing_idx = description_list.index("growing")
        plant_type = " ".join(description_list[type_idx:growing_idx]).title()
        foliage = plant_type.split(' ')[0] if len(plant_type.split(' ')) == 2 else None
    except ValueError:
        pass

    try:
        height_idx = description_list.index("growing") + 2
        height = float(description_list[height_idx])
    except (ValueError, IndexError):
        pass

    if "rate." in description_list:
        growth_rate = description_list[description_list.index("rate.") - 1]

    try:
        width_idx = description_list.index("by") + 1
        width = float(description_list[width_idx])
    except (ValueError, IndexError):
        pass

    pollinators, leaf, flower, ripen_date, soils, ph, ph_split, reproduction, preferences, tolerances = '', '', '', '', '', '', [], '', '', ''
    if "pollinated by" in description:
        pollinators_start = description.index("pollinated by") + len("pollinated by") + 1
        pollinators_end = description.index(".", pollinators_start)
        pollinators = [p.strip().capitalize() for p in description[pollinators_start:pollinators_end].split(',')]

    if "leaf" in description_list:
        leaf_idx = description_list.index("leaf")
        if description_list[leaf_idx + 1] == "from":
            leaf = " ".join(description_list[leaf_idx + 2: leaf_idx + 5]).strip(",")

    if "flower" in description_list:
        flower_idx = description_list.index("flower")
        if description_list[flower_idx + 1] == "in":
            flower = description_list[flower_idx + 2].strip(",")
        elif description_list[flower_idx + 1] == "from":
            flower = " ".join(description_list[flower_idx + 2: flower_idx + 5]).strip(",")

    if "ripen" in description_list:
        tmp_idx = description_list.index("ripen")
        if description_list[tmp_idx + 1] == "in":
            ripen_date = description_list[tmp_idx + 2].strip(".")
        elif description_list[tmp_idx + 1] == "from":
            ripen_date = " ".join(description_list[tmp_idx + 2: tmp_idx + 5]).strip(".")

    soil_idx = description.find("Suitable for:")
    if soil_idx != -1:
        soil_text = description[soil_idx:description.find(".", soil_idx)]
        soils = re.findall(r"(light|medium|heavy)", soil_text)

    # Extracting and correlating pH values
    if "pH:" in description_list:
        ph_idx = description_list.index("pH:") + 1
        ph_list = description_list[ph_idx:]
        end_idx = next((i for i, x in enumerate(ph_list) if 'soil' in x), len(ph_list))
        ph = " ".join(ph_list[:end_idx]).replace(r' (mildly alkaline)', '').capitalize()
        ph_split = re.split(',| and ', ph.replace(' soils', '').replace(' can grow in', ''))

    reproduction_match = re.findall(r"The species is\s(\w+)", description)
    if reproduction_match:
        reproduction = reproduction_match[0].capitalize()

    preferences_match = re.findall("prefers (.*?)\ and", description)
    if preferences_match:
        preferences = preferences_match[0].strip().capitalize()

    tolerances_match = re.findall("can tolerate (.*?)\.", description)
    if tolerances_match:
        tolerances = tolerances_match[0].capitalize()

    table = soup.find("table", class_="table table-hover table-striped")
    common_name = table.find("span", id="ContentPlaceHolder1_lblCommanName").text
    family = table.find("span", id="ContentPlaceHolder1_lblFamily").text
    hardiness_range = table.find("span", id="ContentPlaceHolder1_lblUSDAhardiness").text

    # Extract hardiness zones and correlate them
    hardiness_zones = []
    zone_min, zone_max = None, None
    match = re.search(r'(\d+)\-(\d+)', hardiness_range)
    if match:
        zone_min, zone_max = match.groups()
        hardiness_zones = list(range(int(zone_min), int(zone_max) + 1))

    habitats = re.sub(r"\[\d+\]", "", table.find("span", id="ContentPlaceHolder1_txtHabitats").text)
    habitat_range = table.find("span", id="ContentPlaceHolder1_lblRange").text

    edibility = table.find("span", id="ContentPlaceHolder1_txtEdrating").text.strip()[1]
    other_uses = table.find("span", id="ContentPlaceHolder1_txtOtherUseRating").text.strip()[1]
    medicinal_rating = table.find("span", id="ContentPlaceHolder1_txtMedRating").text.strip()[1]

    img_url = ''
    details_table = soup.find('table', id='ContentPlaceHolder1_tblPlantImges')
    if details_table:
        img_tag = details_table.find('img')
        if img_tag:
            img_url = 'https://pfaf.org' + img_tag['src'][2:]

    return [
        family, genus, species, common_name, growth_rate, f"{zone_min} to {zone_max}", height, width,
        plant_type, foliage, pollinators, leaf, flower, ripen_date, reproduction, soils, ph, ph_split, preferences,
        tolerances, habitats, habitat_range, edibility, medicinal_rating, other_uses, pfaf_url, img_url
    ]

def scrape_genus_species(url, headers):
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    table = soup.find('table', id='ContentPlaceHolder1_gvresults')
    if not table:
        return []

    plant_data = []
    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if cols:
            latin_name = cols[0].get_text(strip=True)
            try:
                genus, species = latin_name.split(' ', 1)
            except ValueError:
                print(f"Skipping invalid latin name: {latin_name}")
                genus, species = latin_name, ""
            try:
                plant_info = get_plant_info(genus, species)
                if plant_info:
                    plant_data.append(plant_info)
            except Exception as e:
                print(f"Failed to process {latin_name}: {e}")

    next_page = soup.find('a', {'id': 'ContentPlaceHolder1_gvresults_ctl23_LinkButtonNext'})
    if next_page:
        next_url = "https://pfaf.org/user/" + next_page['href']
        plant_data.extend(scrape_genus_species(next_url, headers))


    return plant_data

def scrape_plant_data():
    latin_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    plant_data = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(scrape_genus_species, f"https://pfaf.org/user/DatabaseSearhResult.aspx?LatinName={letter}", headers) for letter in latin_alphabet]
        for future in concurrent.futures.as_completed(futures):
            plant_data.extend(future.result())

    with open('plant_data_debug.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file, quoting=csv.QUOTE_MINIMAL)
        writer.writerow(attributes)
        for data in plant_data:
            # Ensure that each list element is properly formatted as a string
            formatted_data = [str(item) if isinstance(item, list) else item for item in data]
            writer.writerow(formatted_data)

if __name__ == "__main__":
    scrape_plant_data()
