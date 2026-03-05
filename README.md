# PLANTalytics — [plantalytics.net](https://plantalytics.net/)

> Explore **7,400+ plants** by hardiness zone, edibility, medicinal value & more — interactive charts, photo grids and filterable data powered by Apache ECharts.

[![PLANTalytics Dashboard](https://raw.githubusercontent.com/TahriT/PLANTalytics/main/docs/og-image.png)](https://plantalytics.net/)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Interactive Explorer** | Photo grid, donut charts, scatter plots, calendar heatmap, stacked bars — all click-to-filter |
| **7,400+ Plants** | Data sourced from [PFAF](https://pfaf.org) and [Permapeople](https://permapeople.org) |
| **ZIP → Zone Lookup** | Enter a US ZIP code to find your USDA Hardiness Zone instantly |
| **Bloom & Harvest Calendar** | See flowering and ripening months at a glance |
| **Edibility × Medicinal Scatter** | Discover the most versatile food & medicine plants |
| **Pollinator Support** | Filter by bee, butterfly, moth and other pollinator types |
| **Top Picks Table** | Ranked by a composite utility score (edibility + medicinal + other uses) |
| **Mobile Responsive** | Quick-filter bar, touch targets, floating toast — fully usable on phones |
| **Open Graph / SEO** | Rich link previews, JSON-LD structured data, Twitter Cards |
| **Power BI Dashboard** | Companion advanced dashboard for deeper analysis |
| **Plant Health Tracking** | Check out [Sproutcast.io](https://sproutcast.io) for plant health monitoring |

---

## 🖥️ Live Demo

**→ [plantalytics.net](https://plantalytics.net/)**

---

## Videos

[Watch the video on YouTube](https://www.youtube.com/watch?v=Gl3eHfdakuo)

---

## 📊 Data Sources

### Permapeople (v2 scraper)
`permapeople_data.py` queries the API for all plants and saves them into a CSV file.

https://permapeople.org

The script fetches various plant characteristics:
 
| ID  | Name | Latin Name | Family | Synonyms | Edible Parts | Medicinal Parts | Uses | Toxicity | Growth Habit | Height | Spread | Growth Rate | Hardiness Zone | Sun Requirements | Water Requirements | Soil Requirements | Propagation Methods | Harvest Time | Bloom Time | Seed Viability | Preferred Climates | Ecosystem Services | Pollinators | Invasive Potential | Companion Planting | Pests/Diseases | Notes |
|-----|------|------------|--------|----------|--------------|-----------------|------|----------|--------------|--------|--------|-------------|----------------|------------------|--------------------|-------------------|--------------------|--------------|-----------|----------------|--------------------|-------------------|------------|--------------------|--------------------|----------------|-------|

### PFAF (v1 scraper)
`pfaf_generator.py` scrapes plant data from the [Plants For A Future](https://pfaf.org) website and saves it into a CSV file.

The script fetches: family, genus, species, common name, growth rate, hardiness zones, height, width, type, foliage, pollinators, leaf, flower, ripening period, reproduction, soils, pH, preferences, tolerances, habitats, habitat range, edibility, medicinal rating, other uses, and image URL.

Please consider donating to them! https://pfaf.org/

Also thanks to Nigel Wright for walking so I could run!
Please check out his repo: https://github.com/jwnigel/permaculture/

---

## 🚀 Usage

The python script will start scraping and saving the data to a CSV file. It can be easily modified to specify a specific set of plants by modifying the letters using the `latin_alphabet` variable in the script.

> ⚠️ Sparse data can occur — please be aware.

### Example Output

| Family     | Genus   | Species  | CommonName | GrowthRate | HardinessZones | Height | Width | Type       | Foliage  | Pollinators | Leaf    | Flower   | Ripen      | Reproduction | Soils        | pH        | pH_split    | Preferences | Tolerances | Habitats     | HabitatRange            | Edibility | Medicinal | OtherUses | PFAF URL                                           |
|------------|---------|----------|------------|------------|----------------|--------|-------|------------|----------|-------------|---------|----------|------------|--------------|--------------|-----------|-------------|-------------|-------------|--------------|--------------------------|-----------|-----------|-----------|---------------------------------------------------|
| Myrtaceae  | Eucalyptus | globulus | Blue Gum   | Fast       | [10, 11, 12]   | 70     | 40    | Tree       | Evergreen| Bees        | Evergreen | November | December   | Dioecious    | Light, Medium| Acidic    | [5.0, 7.0]  | Sun         | Wind       | Forest      | Australia, Tasmania     | 4         | 3         | 5         | [PFAF Link](https://pfaf.org/user/Plant.aspx?LatinName=Eucalyptus+globulus) |
| Rosaceae   | Malus   | domestica | Apple       | Moderate   | [4, 5, 6, 7, 8]| 20     | 25    | Tree       | Deciduous| Bees        | Spring  | May      | September  | Hermaphrodite| Heavy, Medium| Neutral   | [6.0, 7.5]  | Moist       | Shade      | Orchard     | Europe, Central Asia    | 5         | 4         | 3         | [PFAF Link](https://pfaf.org/user/Plant.aspx?LatinName=Malus+domestica)   |

---

## 📈 Power BI Dashboard

[![Power BI Report](https://github.com/TahriT/PLANTalytics/blob/main/Images/pfaf_logo_bg.jpg?raw=true)](https://app.powerbi.com/view?r=eyJrIjoiYzI0ZmIyZmYtOWNjZS00NWIzLThjMmMtYmMyOTgwOThlYTUzIiwidCI6IjA5MmUzOThlLTIzYTktNGFjMS04MmJmLWIwMzQ2NTRlMGZjMyJ9)

[Open Power BI Dashboard →](https://app.powerbi.com/view?r=eyJrIjoiYzI0ZmIyZmYtOWNjZS00NWIzLThjMmMtYmMyOTgwOThlYTUzIiwidCI6IjA5MmUzOThlLTIzYTktNGFjMS04MmJmLWIwMzQ2NTRlMGZjMyJ9)

---

## 🌡️ Zone Data

Hardiness zone lookup powered by data from Oregon State University PRISM:

https://prism.oregonstate.edu/projects/plant_hardiness_zones.php

[![USDA Hardiness Map](https://github.com/TahriT/PLANTalytics/blob/main/Images/USDA_Hardiness_Map.jpg?raw=true)](https://prism.oregonstate.edu/projects/plant_hardiness_zones.php)

---

## 🤝 Contributing

This project was a test to help visualize data using plant synergies. I will periodically update my repo but the data might not always be current.

Please also consider following https://github.com/jwnigel/permaculture/

Feel free to contribute to this project by creating issues or submitting pull requests.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
