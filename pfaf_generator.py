#####################################

"""
Web Scraper for pfaf.org V1.0 

This script scrapes plant data from the Plants For A Future (PFAF) database.
The data includes various attributes such as Latin Name, Common Name, Habit, Height, etc.

Please consider donating to them! https://pfaf.org/

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
import csv


base_url = "https://pfaf.org/user/DatabaseSearhResult.aspx?LatinName={}"
latin_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

# Added header to avoid 403 response. 
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

plant_data = []

for letter in latin_alphabet:
    url = base_url.format(letter)
    response = requests.get(url, headers=headers)
    print(f"Searching URL: {url}")

    # Add a delay by uncommenting below to ensure the page has enough time to load
    # time.sleep(2)
    
    if response.status_code == 200:
        print(f"Successfully fetched data for letter: {letter}")
        soup = BeautifulSoup(response.content, 'html.parser')
        
        table = soup.find('table', id='ContentPlaceHolder1_gvresults')
        if table:
            for row in table.find_all('tr')[1:]:  # Skip the header row
                cols = row.find_all('td')
                if cols:
                    latin_name = cols[0].get_text(strip=True)
                    common_name = cols[1].get_text(strip=True)
                    habit = cols[2].get_text(strip=True)
                    height = cols[3].get_text(strip=True)
                    hardiness = cols[4].get_text(strip=True).strip()
                    growth = cols[5].get_text(strip=True)
                    soil = cols[6].get_text(strip=True)
                    shade = cols[7].get_text(strip=True)
                    moisture = cols[8].get_text(strip=True)
                    edible = cols[9].get_text(strip=True)
                    medicinal = cols[10].get_text(strip=True)
                    other_uses = cols[11].get_text(strip=True)
                    link = 'https://pfaf.org/user/' + cols[0].find('a')['href']

                    plant_data.append([latin_name, common_name, habit, height, hardiness, growth, soil, shade, moisture, edible, medicinal, other_uses, link])
        else:
            print(f"No table found for letter: {letter}")
    else:
        print(f"Failed to fetch data for letter: {letter}, Status code: {response.status_code}")

# Write data to CSV
with open("plant_data.csv", "w", newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["Latin Name", "Common Name", "Habit", "Height", "Hardiness", "Growth", "Soil", "Shade", "Moisture", "Edible", "Medicinal", "Other Uses", "Link"])
    writer.writerows(plant_data)
