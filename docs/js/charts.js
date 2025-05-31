// Chart configurations and data processing
export const chartConfigs = {
    globe: {
        backgroundColor: 'transparent',
        tooltip: {
            formatter: function(params) {
                return `${params.data.name}<br/>Region: ${params.data.properties.region}<br/>Zone: ${params.data.properties.hardinessZone}`;
            }
        },
        visualMap: {
            show: true,
            min: 0,
            max: 1,
            inRange: {
                color: ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c']
            },
            text: ['Cold', 'Hot'],
            calculable: true,
            left: 'left',
            top: 'bottom'
        },
        globe: {
            baseTexture: './assets/earth.jpg',
            heightTexture: './assets/bathymetry_bw_composite_4k.jpg',
            displacementScale: 0.1,
            shading: 'lambert',
            light: {
                ambient: {
                    intensity: 0.3
                },
                main: {
                    intensity: 1.5,
                    shadow: true,
                    shadowQuality: 'high'
                }
            },
            layers: [
                {
                    type: 'blend',
                    blendTo: 'emission',
                    texture: './assets/night.jpg'
                },
                {
                    type: 'overlay',
                    texture: './assets/clouds.png',
                    shading: 'lambert',
                    distance: 5
                }
            ],
            viewControl: {
                autoRotate: true,
                autoRotateSpeed: 5,
                distance: 100,
                alpha: 30,
                beta: 0,
                center: [0, 0, 0],
                minAlpha: 10,
                maxAlpha: 90,
                minBeta: -90,
                maxBeta: 90,
                minDistance: 50,
                maxDistance: 200,
                animation: true,
                animationDurationUpdate: 1000,
                damping: 0.8,
                rotateSensitivity: 0.5,
                zoomSensitivity: 0.5
            },
            postEffect: {
                enable: true,
                bloom: {
                    enable: true,
                    bloomIntensity: 0.1
                },
                SSAO: {
                    enable: true,
                    quality: 'medium',
                    radius: 2,
                    intensity: 1.5
                }
            },
            temporalSuperSampling: {
                enable: true,
                motionBlurFactor: 0.5
            }
        },
        series: [{
            type: 'scatter3D',
            coordinateSystem: 'globe',
            data: [], // Will be populated with plant locations
            symbolSize: 6,
            itemStyle: {
                color: function(params) {
                    // Color based on hardiness zone
                    const zone = params.data.properties.minZone;
                    if (zone <= 3) return '#3498db'; // Cold zones
                    if (zone <= 6) return '#2ecc71'; // Temperate zones
                    if (zone <= 9) return '#f1c40f'; // Warm zones
                    return '#e74c3c'; // Hot zones
                },
                opacity: 0.8
            },
            emphasis: {
                itemStyle: {
                    color: '#fff',
                    borderColor: '#000',
                    borderWidth: 2,
                    opacity: 1
                },
                label: {
                    show: true,
                    formatter: function(params) {
                        return `${params.data.name}\nZone: ${params.data.properties.hardinessZone}\nRegion: ${params.data.properties.region}`;
                    },
                    position: 'top',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: [5, 10],
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: 12
                }
            }
        }]
    },

    leaves: {
        title: {
            text: 'Leaf Characteristics',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Deciduous', 'Evergreen', 'Semi-evergreen'],
            top: '10%'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Spring', 'Summer', 'Fall', 'Winter']
        },
        yAxis: {
            type: 'value',
            name: 'Number of Species'
        },
        series: [
            {
                name: 'Deciduous',
                type: 'bar',
                stack: 'total',
                data: []
            },
            {
                name: 'Evergreen',
                type: 'bar',
                stack: 'total',
                data: []
            },
            {
                name: 'Semi-evergreen',
                type: 'bar',
                stack: 'total',
                data: []
            }
        ]
    },

    stem: {
        title: {
            text: 'Growth Patterns',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Height', 'Spread'],
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: ['Fast', 'Moderate', 'Slow']
        },
        yAxis: {
            type: 'value',
            name: 'Average Size (m)'
        },
        series: [
            {
                name: 'Height',
                type: 'line',
                data: []
            },
            {
                name: 'Spread',
                type: 'line',
                data: []
            }
        ]
    },

    roots: {
        title: {
            text: 'Soil Requirements',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Soil Types',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 0, name: 'Light' },
                    { value: 0, name: 'Medium' },
                    { value: 0, name: 'Heavy' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    },

    water: {
        title: {
            text: 'Water Requirements',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        radar: {
            indicator: [
                { name: 'Drought', max: 5 },
                { name: 'Moist', max: 5 },
                { name: 'Wet', max: 5 },
                { name: 'Waterlogged', max: 5 }
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [],
                    name: 'Water Tolerance'
                }
            ]
        }]
    }
};

// Helper function to clean and standardize region names
function standardizeRegion(region) {
    if (!region) return null;
    
    // Common region name variations
    const regionMap = {
        'USA': ['United States', 'US', 'U.S.A.', 'U.S.', 'America'],
        'UK': ['United Kingdom', 'Great Britain', 'England', 'Britain'],
        'Europe': ['European', 'EU', 'European Union'],
        'Asia': ['Asian', 'East Asia', 'South Asia', 'Southeast Asia'],
        'Africa': ['African', 'North Africa', 'South Africa', 'Sub-Saharan Africa'],
        'Australia': ['Australian', 'Oceania', 'Pacific'],
        'South America': ['Latin America', 'Central America', 'Caribbean'],
        'North America': ['Canada', 'Mexico', 'Central America'],
        'Mediterranean': ['Mediterranean Basin', 'Mediterranean Region'],
        'Tropical': ['Tropics', 'Tropical Region', 'Equatorial']
    };

    // Clean the input
    let cleaned = region.trim()
        .replace(/\s+/g, ' ')
        .replace(/[.,]/g, '')
        .toLowerCase();

    // Check for matches in the region map
    for (const [standard, variations] of Object.entries(regionMap)) {
        if (variations.some(v => cleaned.includes(v.toLowerCase()))) {
            return standard;
        }
    }

    // If no match found, return the cleaned input
    return cleaned.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Function to process CSV data
export function processPlantData(csvData) {
    console.log('Raw CSV data:', csvData.substring(0, 500)); // Debug log
    const data = Papa.parse(csvData, { 
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim()
    }).data;
    
    console.log('Parsed data sample:', data[0]); // Debug log
    
    // Extract unique regions and hardiness zones
    const regions = new Set();
    const hardinessZones = new Set();
    
    data.forEach(plant => {
        if (plant.HabitatRange) {
            const standardizedRegion = standardizeRegion(plant.HabitatRange);
            if (standardizedRegion) {
                regions.add(standardizedRegion);
            }
        }
        if (plant.HardinessZones) {
            const [min, max] = plant.HardinessZones.split(' to ').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                for (let zone = min; zone <= max; zone++) {
                    hardinessZones.add(zone);
                }
            }
        }
    });

    // Sort hardiness zones numerically
    const sortedZones = Array.from(hardinessZones).sort((a, b) => a - b);
    
    // Process data for each chart
    const processedData = {
        globe: processGlobeData(data),
        leaves: processLeavesData(data),
        stem: processStemData(data),
        roots: processRootsData(data),
        water: processWaterData(data),
        regions: Array.from(regions).filter(r => r).sort(),
        hardinessZones: sortedZones
    };

    console.log('Processed data summary:', {
        regions: processedData.regions.length,
        zones: processedData.hardinessZones.length,
        globePoints: processedData.globe.length,
        leavesData: processedData.leaves.length,
        stemData: Object.keys(processedData.stem),
        rootsData: processedData.roots.length,
        waterData: processedData.water.length
    });

    return processedData;
}

// Data processing functions for each chart
export function processGlobeData(data) {
    console.log('Processing globe data...'); // Debug log
    
    // Define coordinate mapping for regions without specific coordinates
    const regionCoordinates = {
        'USA': [-98.5795, 39.8283],
        'UK': [-0.1278, 51.5074],
        'Europe': [10.4515, 51.1657],
        'Asia': [100.6197, 34.0479],
        'Africa': [20.9394, 6.8770],
        'Australia': [133.7751, -25.2744],
        'South America': [-58.3816, -23.4425],
        'North America': [-98.5795, 39.8283],
        'Mediterranean': [14.2681, 40.8518],
        'Tropical': [0, 0]
    };

    return data
        .filter(plant => {
            // Check if plant has coordinates or a valid region
            const hasCoords = !isNaN(plant.Longitude) && !isNaN(plant.Latitude);
            const hasRegion = plant.HabitatRange && standardizeRegion(plant.HabitatRange);
            
            if (!hasCoords && !hasRegion) {
                console.log('Plant missing both coordinates and region:', plant.CommonName);
                return false;
            }
            return true;
        })
        .map(plant => {
            const [minZone, maxZone] = (plant.HardinessZones || '').split(' to ').map(Number);
            const region = standardizeRegion(plant.HabitatRange);
            
            // Use actual coordinates if available, otherwise use region coordinates
            let coordinates;
            if (!isNaN(plant.Longitude) && !isNaN(plant.Latitude)) {
                coordinates = [parseFloat(plant.Longitude), parseFloat(plant.Latitude)];
            } else if (region && regionCoordinates[region]) {
                coordinates = regionCoordinates[region];
            } else {
                coordinates = [0, 0]; // Default to center of map
            }

            // Convert coordinates to 3D position on globe surface
            const radius = 100; // Globe radius
            const lon = coordinates[0] * Math.PI / 180;
            const lat = coordinates[1] * Math.PI / 180;
            
            const x = radius * Math.cos(lat) * Math.cos(lon);
            const y = radius * Math.sin(lat);
            const z = radius * Math.cos(lat) * Math.sin(lon);

            return {
                name: plant.CommonName,
                value: [x, y, z],
                properties: {
                    hardinessZone: plant.HardinessZones,
                    type: plant.Type,
                    region: region,
                    minZone: minZone,
                    maxZone: maxZone,
                    hasExactCoordinates: !isNaN(plant.Longitude) && !isNaN(plant.Latitude)
                }
            };
        });
}

export function processLeavesData(data) {
    // Process leaf characteristics data
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const types = ['Deciduous', 'Evergreen', 'Semi-evergreen'];
    
    return types.map(type => ({
        name: type,
        type: 'bar',
        stack: 'total',
        data: seasons.map(season => 
            data.filter(plant => plant.Foliage === type).length
        )
    }));
}

export function processStemData(data) {
    // Process growth pattern data
    const growthRates = ['Fast', 'Moderate', 'Slow'];
    
    return {
        height: growthRates.map(rate => {
            const plants = data.filter(plant => plant.GrowthRate === rate);
            return plants.reduce((sum, plant) => sum + (parseFloat(plant.Height) || 0), 0) / plants.length;
        }),
        spread: growthRates.map(rate => {
            const plants = data.filter(plant => plant.GrowthRate === rate);
            return plants.reduce((sum, plant) => sum + (parseFloat(plant.Width) || 0), 0) / plants.length;
        })
    };
}

export function processRootsData(data) {
    // Process soil requirements data
    const soilTypes = ['Light', 'Medium', 'Heavy'];
    
    return soilTypes.map(type => ({
        value: data.filter(plant => plant.Soils && plant.Soils.includes(type)).length,
        name: type
    }));
}

export function processWaterData(data) {
    // Process water requirements data
    const waterLevels = ['Drought', 'Moist', 'Wet', 'Waterlogged'];
    
    return waterLevels.map(level => {
        const plants = data.filter(plant => 
            plant.WaterRequirements && 
            plant.WaterRequirements.toLowerCase().includes(level.toLowerCase())
        ).length;
        return (plants / data.length) * 5; // Scale to 0-5
    });
}

// Function to filter data by region and hardiness zone
export function filterPlantData(data, region, hardinessZone) {
    if (!data || !data.globe) {
        console.error('Invalid data passed to filterPlantData:', data);
        return data;
    }

    const filtered = {
        ...data,
        globe: data.globe.filter(plant => {
            const [minZone, maxZone] = (plant.properties.hardinessZone || '').split(' to ').map(Number);
            const zoneMatch = !hardinessZone || (minZone <= hardinessZone && maxZone >= hardinessZone);
            const regionMatch = !region || (plant.properties.region && plant.properties.region.includes(region));
            return zoneMatch && regionMatch;
        })
    };

    // Recalculate other chart data based on filtered globe data
    const filteredPlantNames = new Set(filtered.globe.map(p => p.name));
    
    filtered.leaves = processLeavesData(data.globe.filter(p => filteredPlantNames.has(p.name)));
    filtered.stem = processStemData(data.globe.filter(p => filteredPlantNames.has(p.name)));
    filtered.roots = processRootsData(data.globe.filter(p => filteredPlantNames.has(p.name)));
    filtered.water = processWaterData(data.globe.filter(p => filteredPlantNames.has(p.name)));

    return filtered;
}

// Add function to update globe auto-rotation
export function updateGlobeRotation(chart, isDocked) {
    if (chart) {
        const option = chart.getOption();
        option.globe.viewControl.autoRotate = !isDocked;
        chart.setOption(option);
    }
} 