# PLANTalytics
A repository to help better understand the data behind plant growth and synergies using data from pfaf.org

![image](https://github.com/TahriT/PLANTalytics/blob/main/Images/Plantalytics.png?raw=true)


## Videos

[Watch the video on YouTube](https://www.youtube.com/watch?v=Gl3eHfdakuo)


## Plant Data Scraper
This project scrapes plant data from the Plants For A Future (PFAF) website and saves it into a CSV file. 

The script fetches various plant characteristics, including family, genus, species, common name, growth rate, hardiness zones, height, width, type, foliage, pollinators, leaf, flower, ripening period, reproduction, soils, pH, preferences, tolerances, habitats, habitat range, edibility, medicinal rating, other uses, and image URL.

Please consider donating to them! https://pfaf.org/

Also thanks to Nigel Wright for walking so I could run!
Please check out his repo! 
https://github.com/jwnigel/permaculture/


## Usage

The python script will start scraping and saving the data to a CSV file. It can be easily modified or used to specifcy a specifc set of plants modifying the letters using the latin_alphabet variable in the script.


Sparse data can occur please be aware.

## Example Output

| Family     | Genus   | Species  | CommonName | GrowthRate | HardinessZones | Height | Width | Type       | Foliage  | Pollinators | Leaf    | Flower   | Ripen      | Reproduction | Soils        | pH        | pH_split    | Preferences | Tolerances | Habitats     | HabitatRange            | Edibility | Medicinal | OtherUses | PFAF URL                                           |
|------------|---------|----------|------------|------------|----------------|--------|-------|------------|----------|-------------|---------|----------|------------|--------------|--------------|-----------|-------------|-------------|-------------|--------------|--------------------------|-----------|-----------|-----------|---------------------------------------------------|
| Myrtaceae  | Eucalyptus | globulus | Blue Gum   | Fast       | [10, 11, 12]   | 70     | 40    | Tree       | Evergreen| Bees        | Evergreen | November | December   | Dioecious    | Light, Medium| Acidic    | [5.0, 7.0]  | Sun         | Wind       | Forest      | Australia, Tasmania     | 4         | 3         | 5         | [PFAF Link](https://pfaf.org/user/Plant.aspx?LatinName=Eucalyptus+globulus) |
| Rosaceae   | Malus   | domestica | Apple       | Moderate   | [4, 5, 6, 7, 8]| 20     | 25    | Tree       | Deciduous| Bees        | Spring  | May      | September  | Hermaphrodite| Heavy, Medium| Neutral   | [6.0, 7.5]  | Moist       | Shade      | Orchard     | Europe, Central Asia    | 5         | 4         | 3         | [PFAF Link](https://pfaf.org/user/Plant.aspx?LatinName=Malus+domestica)   |



## Power BI Integration
The data is being hosted on this repo as a datasource

## PowerBI Dashboard
[![Power BI Report](https://github.com/TahriT/PLANTalytics/blob/main/Images/pfaf_logo_bg.jpg?raw=true)](https://app.powerbi.com/view?r=eyJrIjoiYzI0ZmIyZmYtOWNjZS00NWIzLThjMmMtYmMyOTgwOThlYTUzIiwidCI6IjA5MmUzOThlLTIzYTktNGFjMS04MmJmLWIwMzQ2NTRlMGZjMyJ9)

https://app.powerbi.com/view?r=eyJrIjoiYzI0ZmIyZmYtOWNjZS00NWIzLThjMmMtYmMyOTgwOThlYTUzIiwidCI6IjA5MmUzOThlLTIzYTktNGFjMS04MmJmLWIwMzQ2NTRlMGZjMyJ9

I'm also using the zone data from Oregen State UI
https://prism.oregonstate.edu/projects/plant_hardiness_zones.php

[![image](https://github.com/TahriT/PLANTalytics/blob/main/Images/USDA_Hardiness_Map.jpg?raw=true)



## Contributing
This project was a test to help visualize data using plant synergies. I will periodically update my repo but the data might not always be current. 

Please also consider following https://github.com/jwnigel/permaculture/

Feel free to contribute to this project by creating issues or submitting pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
