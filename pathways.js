/**
 * Air → ocean pathways shown in the "Where Air Meets the Ocean" diagram.
 * Text describes mechanisms documented in environmental science, without
 * claiming how large each one is in Teluk Jakarta. That needs measurement.
 */
export const PATHWAYS = [
  {
    key: 'emission',
    title: 'Emission',
    icon: 'factory',
    summary: 'Traffic, ports, power plants and industry along the coast release gases and particles.',
    detail:
      'Combustion releases NO₂, SO₂, CO and particulate matter (PM2.5, PM10). Some gases later turn into new particles in the air, such as sulfate and nitrate.',
    air: ['pm25', 'pm10', 'so2', 'no2', 'co'],
    ocean: [],
    evidence: 'Well established: inventories and monitoring link these pollutants to combustion sources.',
  },
  {
    key: 'transport',
    title: 'Transport by wind',
    icon: 'wind',
    summary: 'Wind carries pollutants away from where they were produced, sometimes out over the sea.',
    detail:
      'Land and sea breezes switch direction during the day, and monsoon winds shift by season. Where pollution ends up depends on wind speed and direction, which BMKG weather data can help trace.',
    air: ['pm25', 'o3'],
    ocean: [],
    evidence: 'Well established in principle. Local paths need wind data and dispersion modelling.',
  },
  {
    key: 'deposition',
    title: 'Deposition',
    icon: 'rain',
    summary: 'Particles settle out (dry deposition) or are washed out by rain (wet deposition) onto the water.',
    detail:
      'Atmospheric deposition can deliver nitrogen, sulfur, metals and other compounds to coastal waters. Rain made acidic by SO₂ and NOx is one form of wet deposition.',
    air: ['pm25', 'pm10', 'so2', 'no2'],
    ocean: ['tss', 'ph', 'chla'],
    evidence: 'Documented globally as a nutrient and pollutant source. Its share in Teluk Jakarta is not yet quantified here.',
  },
  {
    key: 'exchange',
    title: 'Air–sea gas exchange',
    icon: 'bubble',
    summary: 'CO₂ and oxygen cross the sea surface. The ocean absorbs CO₂, which slowly lowers pH.',
    detail:
      'Waves and wind drive gas exchange at the surface. Oxygen from the air replenishes dissolved oxygen, and absorbed CO₂ forms carbonic acid, causing ocean acidification over decades.',
    air: [],
    ocean: ['ph', 'do', 'temp'],
    evidence: 'Well established at a global scale (ocean acidification). Local pH also depends strongly on rivers and biology.',
  },
  {
    key: 'runoff',
    title: 'Runoff',
    icon: 'river',
    summary: 'Rain washes pollutants that settled on land into rivers that flow into the bay.',
    detail:
      'Teluk Jakarta receives water from many rivers. They carry sediment, nutrients and wastewater, and some of that load first fell from the air onto roofs, roads and soil.',
    air: ['pm10'],
    ocean: ['tss', 'salinity', 'chla'],
    evidence: 'Rivers are a major input to the bay. Separating air-derived and land-derived loads requires dedicated studies.',
  },
  {
    key: 'response',
    title: 'Marine response',
    icon: 'fish',
    summary: 'Extra nutrients can fuel algal blooms. When they decay, oxygen drops and corals and fish become stressed.',
    detail:
      'High chlorophyll-a signals plankton blooms. As blooms die and decompose, dissolved oxygen falls. Murky water (high TSS) blocks light for seagrass and corals.',
    air: [],
    ocean: ['chla', 'do', 'tss', 'ph'],
    evidence: 'These mechanisms are well documented. SEAIR displays co-occurring patterns but does not prove causes.',
  },
];
