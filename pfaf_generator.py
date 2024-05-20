#####################################

"""
Web Scraper for pfaf.org V1.1 

This script scrapes plant data from the Plants For A Future (PFAF) database.
The data includes various attributes such as Latin Name, Common Name, Habit, Height, etc.

Please consider donating to them! https://pfaf.org/

Also thanks to Nigel Wright for walking so I could run!
Please check out his repo! 
https://github.com/jwnigel/permaculture/



Author:
-------
Tahri Turner
https://github.com/TahriT/PLANTalytics
Date:5/20/2024
-------

"""

#####################################
import requests
from bs4 import BeautifulSoup
import re
import csv
import time

attributes = [
    "Family", "Genus", "Species", "CommonName", "GrowthRate", "HardinessZones",
    "Height", "Width", "Type", "Foliage", "Pollinators", "Leaf", "Flower", "Ripen", "Reproduction", "Soils",
    "pH", "pH_split", "Preferences", "Tolerances", "Habitat", "HabitatRange",
    "Edibility", "Medicinal", "OtherUses", "PFAF", "Image URL"
]

def get_plant_info(genus, species =""):
    pfaf_url = f"https://pfaf.org/user/Plant.aspx?LatinName={genus}+{species}"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    }
    page = requests.get(pfaf_url, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')

    description = soup.find("meta", id="description")['content']
    description_list = description.split()

    # Extracting characteristics
    try:
        type_idx = description_list.index("is") + 2
        growing_idx = description_list.index("growing")
        plant_type = " ".join(description_list[type_idx:growing_idx]).title()
        foliage = plant_type.split(' ')[0] if len(plant_type.split(' ')) == 2 else None
    except ValueError:
        plant_type = foliage = None

    try:
        height_idx = description_list.index("growing") + 2
        height = float(description_list[height_idx])
    except (ValueError, IndexError):
        height = None

    growth_rate = description_list[description_list.index("rate.") - 1] if "rate." in description_list else ""

    try:
        width_idx = description_list.index("by") + 1
        width = float(description_list[width_idx])
    except (ValueError, IndexError):
        width = None
    ""

    pollinators = ''
    if "pollinated by" in description:
        pollinators_start = description.index("pollinated by") + len("pollinated by") + 1
        pollinators_end = description.index(".", pollinators_start)
        pollinators = [p.strip().capitalize() for p in description[pollinators_start:pollinators_end].split(',')]

    leaf = ""
    if "leaf" in description_list:
        leaf_idx = description_list.index("leaf")
        if description_list[leaf_idx + 1] == "from":
            leaf = " ".join(description_list[leaf_idx + 2: leaf_idx + 5]).strip(",")

    flower = ""
    if "flower" in description_list:
        flower_idx = description_list.index("flower")
        if description_list[flower_idx + 1] == "in":
            flower = description_list[flower_idx + 2].strip(",")
        elif description_list[flower_idx + 1] == "from":
            flower = " ".join(description_list[flower_idx + 2: flower_idx + 5]).strip(",")

    ripen_date = ""
    if "ripen" in description_list:
        tmp_idx = description_list.index("ripen")
        if description_list[tmp_idx + 1] == "in":
            ripen_date = description_list[tmp_idx + 2].strip(".")
        elif description_list[tmp_idx + 1] == "from":
            ripen_date = " ".join(description_list[tmp_idx + 2: tmp_idx + 5]).strip(".")

    soils = ""
    soil_idx = description.find("Suitable for:")
    soil_text = description[soil_idx:description.find(".", soil_idx)]
    soils = re.findall(r"(light|medium|heavy)", soil_text)

    ph = ""
    if "pH:" in description_list:
        ph_idx = description_list.index("pH:") + 1
        ph_list = description_list[ph_idx:]
        end_idx = next((i for i, x in enumerate(ph_list) if 'soil' in x), len(ph_list))
        ph = " ".join(ph_list[:end_idx]).replace(r' (mildly alkaline)', '').capitalize()
        ph_split = re.split(',| and ', ph.replace(' soils', '').replace(' can grow in', ''))
    else:
        ph_split = []

    reproduction = re.findall(r"The species is\s(\w+)", description)[0].capitalize() if re.findall(r"The species is\s(\w+)", description) else ''

    preferences = re.findall("prefers (.*?)\ and", description)[0].strip().capitalize() if re.findall("prefers (.*?)\ and", description) else ''
    tolerances = re.findall("can tolerate (.*?)\.", description)[0].capitalize() if re.findall("can tolerate (.*?)\.", description) else ''

    table = soup.find("table", class_="table table-hover table-striped")
    common_name = table.find("span", id="ContentPlaceHolder1_lblCommanName").text
    family = table.find("span", id="ContentPlaceHolder1_lblFamily").text
    hardiness_range = table.find("span", id="ContentPlaceHolder1_lblUSDAhardiness").text

    hardiness_zones = []
    match = re.search(r'(\d+)\-(\d+)', hardiness_range)
    if match:
        zone_min = match.group(1)
        zone_max = match.group(2)
        hardiness_zones = list(range(int(zone_min), int(zone_max) + 1))

    habitats = re.sub(r"\[\d+\]", "", table.find("span", id="ContentPlaceHolder1_txtHabitats").text) or ''
    habitat_range = table.find("span", id="ContentPlaceHolder1_lblRange").text or ''

    edibility = table.find("span", id="ContentPlaceHolder1_txtEdrating").text.strip()[1]
    other_uses = table.find("span", id="ContentPlaceHolder1_txtOtherUseRating").text.strip()[1]
    medicinal_rating = table.find("span", id="ContentPlaceHolder1_txtMedRating").text.strip()[1]

    # Extract the image URL
    img_url = ''
    details_table = soup.find('table', id='ContentPlaceHolder1_tblPlantImges')
    if details_table:
        img_tag = details_table.find('img')
        if img_tag:
            img_url = img_tag['src']
            img_url =  'https://pfaf.org' + img_url[2:] 

    return [
        family, genus, species, common_name, growth_rate, hardiness_zones, height, width,
        plant_type, foliage, pollinators, leaf, flower, ripen_date, reproduction, soils, ph, ph_split, preferences,
        tolerances, habitats, habitat_range, edibility, medicinal_rating, other_uses, pfaf_url, img_url
    ]

def scrape_plant_data():
    latin_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    plant_data = []

    for letter in latin_alphabet:
        url = f"https://pfaf.org/user/DatabaseSearhResult.aspx?LatinName={letter}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        #time.sleep(2)  # Add a delay to ensure the page has enough time to load
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            table = soup.find('table', id='ContentPlaceHolder1_gvresults')
            if table:
                for row in table.find_all('tr')[1:]:  # Skip the header row
                    cols = row.find_all('td')
                    if cols:
                     latin_name = cols[0].get_text(strip=True)
                    try:
                        genus, species = latin_name.split(' ', 1)
                    except ValueError:
                        print(f"Skipping invalid latin name: {latin_name}")
                        plant_info = get_plant_info(genus, species)
                        genus = latin_name
                        species = ""
                    try:
                        plant_info = get_plant_info(genus, species)
                        plant_data.append(plant_info)
                    except Exception as e:
                        print(f"Failed to process {latin_name}: {e}")
                # Check if there is a next page and scrape it
                next_page = soup.find('a', {'id': 'ContentPlaceHolder1_gvresults_ctl23_LinkButtonNext'})
                if next_page:
                    next_url = "https://pfaf.org/user/" + next_page['href']
                    print(f"Searching: {next_url}")
                    response = requests.get(next_url, headers=headers)
                    time.sleep(2)  # Add a delay to ensure the page has enough time to load
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')
                        table = soup.find('table', id='ContentPlaceHolder1_gvresults')
                        if table:
                            for row in table.find_all('tr')[1:]:  # Skip the header row
                                cols = row.find_all('td')
                                if cols:
                                    latin_name = cols[0].get_text(strip=True)
                                    genus, species = latin_name.split()
                                    plant_info = get_plant_info(genus, species)
                                    plant_data.append(plant_info)

    # Write data to CSV
    with open('plant_data.csv', 'w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(attributes)
        writer.writerows(plant_data)

if __name__ == "__main__":
    scrape_plant_data()
