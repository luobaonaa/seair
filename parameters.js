/**
 * Parameter catalogue for SEAIR.
 *
 * `reference` values are indicative thresholds from Indonesian regulations,
 * included to help users read the charts. They must be re-checked against
 * the official text (PP 22/2021 Annex VII & VIII, PermenLHK P.14/2020)
 * before SEAIR shows real measurements.
 *
 * `demo` describes how the in-browser DEMO generator shapes each series.
 * It has no scientific meaning and is replaced by API data later.
 */

export const AIR_PARAMETERS = [
  {
    key: 'ispu',
    domain: 'air',
    name: 'ISPU / AQI',
    full: 'Indeks Standar Pencemar Udara',
    unit: 'index',
    decimals: 0,
    icon: 'gauge',
    what: "Indonesia's air quality index. It turns pollutant concentrations into one number from 0 to 500 with five colour-coded categories.",
    source: 'Calculated from measured pollutants. The highest sub-index sets the ISPU value.',
    why: 'It gives a quick, shared language for "is the air okay today?".',
    reference: { type: 'max', value: 100, label: 'Upper limit of "Sedang"', citation: 'PermenLHK P.14/2020' },
  },
  {
    key: 'pm25',
    domain: 'air',
    name: 'PM2.5',
    full: 'Fine particulate matter (≤2.5 µm)',
    unit: 'µg/m³',
    decimals: 1,
    icon: 'dust',
    what: 'Tiny particles, about 30× thinner than a hair. They are small enough to reach deep into the lungs and the bloodstream.',
    source: 'Vehicle exhaust, industry, power generation, open burning, and secondary formation from gases.',
    why: 'This pollutant is closely linked to respiratory and cardiovascular illness. It can also settle onto the sea surface.',
    reference: { type: 'max', value: 55, label: '24-h ambient standard', citation: 'PP 22/2021 Annex VII' },
    demo: { base: 38, min: 4, max: 190, season: -0.32, weekly: 0.08, noise: 0.28 },
  },
  {
    key: 'pm10',
    domain: 'air',
    name: 'PM10',
    full: 'Coarse particulate matter (≤10 µm)',
    unit: 'µg/m³',
    decimals: 1,
    icon: 'dust',
    what: 'Larger airborne particles such as dust, soot and sea-salt aerosol.',
    source: 'Road dust, construction, industry, combustion and sea spray.',
    why: 'It irritates the airways and carries metals and other compounds that can settle on land and water.',
    reference: { type: 'max', value: 75, label: '24-h ambient standard', citation: 'PP 22/2021 Annex VII' },
    demo: { base: 62, min: 8, max: 260, season: -0.28, weekly: 0.1, noise: 0.25 },
  },
  {
    key: 'so2',
    domain: 'air',
    name: 'SO₂',
    full: 'Sulfur dioxide',
    unit: 'µg/m³',
    decimals: 1,
    icon: 'factory',
    what: 'A sharp-smelling gas from burning fuels that contain sulfur.',
    source: 'Coal and oil combustion, shipping fuel, and industrial processes.',
    why: 'It forms sulfate particles and acid rain, which can lower the pH of rainwater reaching coastal waters.',
    reference: { type: 'max', value: 75, label: '24-h ambient standard', citation: 'PP 22/2021 Annex VII' },
    demo: { base: 28, min: 2, max: 140, season: -0.12, weekly: 0.12, noise: 0.3 },
  },
  {
    key: 'co',
    domain: 'air',
    name: 'CO',
    full: 'Carbon monoxide',
    unit: 'µg/m³',
    decimals: 0,
    icon: 'car',
    what: 'A colourless, odourless gas from incomplete combustion.',
    source: 'Mainly road traffic, plus generators and burning.',
    why: 'It reduces how much oxygen the blood can carry. It is also a good tracer of traffic emissions.',
    reference: { type: 'max', value: 4000, label: '8-h ambient standard', citation: 'PP 22/2021 Annex VII' },
    demo: { base: 950, min: 150, max: 4200, season: -0.1, weekly: 0.18, noise: 0.25 },
  },
  {
    key: 'o3',
    domain: 'air',
    name: 'O₃',
    full: 'Ground-level ozone',
    unit: 'µg/m³',
    decimals: 1,
    icon: 'sun',
    what: 'A pollutant that is not emitted directly. Sunlight forms it from NOx and volatile organic compounds.',
    source: 'Photochemistry driven by traffic and industrial emissions on sunny days.',
    why: 'It irritates the lungs and harms vegetation. Levels peak around midday.',
    reference: { type: 'max', value: 100, label: '8-h ambient standard', citation: 'PP 22/2021 Annex VII' },
    demo: { base: 58, min: 5, max: 190, season: -0.15, weekly: -0.05, noise: 0.3 },
  },
  {
    key: 'no2',
    domain: 'air',
    name: 'NO₂',
    full: 'Nitrogen dioxide',
    unit: 'µg/m³',
    decimals: 1,
    icon: 'car',
    what: 'A reddish-brown gas formed in high-temperature combustion.',
    source: 'Vehicles, ships, power plants and industry.',
    why: 'It helps form ozone and particles. Nitrogen deposited from the air can add nutrients to coastal waters.',
    reference: { type: 'max', value: 65, label: '24-h ambient standard', citation: 'PP 22/2021 Annex VII' },
    demo: { base: 34, min: 4, max: 160, season: -0.1, weekly: 0.2, noise: 0.28 },
  },
];

export const OCEAN_PARAMETERS = [
  {
    key: 'ph',
    domain: 'ocean',
    name: 'pH',
    full: 'Acidity / alkalinity',
    unit: 'pH',
    decimals: 2,
    icon: 'drop',
    anchor: 'coral',
    what: 'How acidic or basic seawater is. Healthy open seawater is slightly basic, around 8.0–8.2.',
    source: 'Shaped by CO₂ uptake from the atmosphere, river inputs, biological activity and pollution.',
    why: 'Lower pH makes it harder for corals and shellfish to build their skeletons and shells.',
    reference: { type: 'range', min: 7, max: 8.5, label: 'Marine biota range', citation: 'PP 22/2021 Annex VIII' },
    demo: { base: 8.1, spread: -0.35, min: 7.2, max: 8.4, season: -0.02, noise: 0.005, absolute: true },
  },
  {
    key: 'do',
    domain: 'ocean',
    name: 'Dissolved Oxygen',
    short: 'DO',
    full: 'Dissolved oxygen',
    unit: 'mg/L',
    decimals: 1,
    icon: 'bubble',
    anchor: 'fish',
    what: 'The oxygen dissolved in seawater that fish and other marine life breathe.',
    source: 'Exchange with the air at the surface plus photosynthesis. Decomposition of organic matter uses it up.',
    why: 'Low oxygen (hypoxia) stresses or kills fish and can cause mass die-offs.',
    reference: { type: 'min', value: 5, label: 'Minimum for marine biota', citation: 'PP 22/2021 Annex VIII' },
    demo: { base: 5.9, spread: -2.1, min: 1.5, max: 8.5, season: -0.06, noise: 0.08 },
  },
  {
    key: 'tss',
    domain: 'ocean',
    name: 'Total Suspended Solids',
    short: 'TSS',
    full: 'Total suspended solids',
    unit: 'mg/L',
    decimals: 1,
    icon: 'murk',
    anchor: 'seabed',
    what: 'Fine particles of sediment, organic matter and plankton floating in the water.',
    source: 'River runoff, coastal erosion, dredging, resuspension, and particles settling from the air.',
    why: 'Murky water blocks sunlight that seagrass and corals need, and the particles can smother reefs.',
    reference: { type: 'max', value: 20, label: 'Coral & seagrass (mangrove: 80)', citation: 'PP 22/2021 Annex VIII' },
    demo: { base: 6, spread: 36, min: 2, max: 140, season: 0.38, noise: 0.25 },
  },
  {
    key: 'salinity',
    domain: 'ocean',
    name: 'Salinity',
    full: 'Salt content',
    unit: '‰',
    decimals: 1,
    icon: 'salt',
    anchor: 'water',
    what: 'How much dissolved salt the water holds, measured in parts per thousand (‰ ≈ PSU).',
    source: 'Freshwater from rivers and rain lowers it. Evaporation raises it.',
    why: 'Sudden drops near river mouths stress coral and seagrass, and show where land runoff is reaching the sea.',
    reference: { type: 'range', min: 33, max: 34, label: 'Natural range for coral & seagrass', citation: 'PP 22/2021 Annex VIII' },
    demo: { base: 33.2, spread: -5, min: 18, max: 35, season: -0.05, noise: 0.01, absolute: true },
  },
  {
    key: 'chla',
    domain: 'ocean',
    name: 'Chlorophyll-a',
    short: 'Chl-a',
    full: 'Chlorophyll-a',
    unit: 'µg/L',
    decimals: 1,
    icon: 'plankton',
    anchor: 'plankton',
    what: 'The green pigment in phytoplankton, the microscopic algae at the base of the marine food web.',
    source: 'Phytoplankton growth, fuelled by nutrients from rivers, wastewater and atmospheric deposition.',
    why: 'Very high values signal eutrophication and possible algal blooms, which can later deplete oxygen.',
    reference: { type: 'note', label: 'No national threshold; interpret with local context', citation: '—' },
    demo: { base: 0.6, spread: 18, min: 0.2, max: 60, season: 0.3, noise: 0.3 },
  },
  {
    key: 'temp',
    domain: 'ocean',
    name: 'Water Temperature',
    short: 'Temp',
    full: 'Sea surface temperature',
    unit: '°C',
    decimals: 1,
    icon: 'thermo',
    anchor: 'sun',
    what: 'The temperature of the upper layer of the sea.',
    source: 'Solar heating, monsoon winds, currents and longer-term climate change.',
    why: 'Prolonged heat above the normal range can cause coral bleaching and changes where fish live.',
    reference: { type: 'range', min: 28, max: 30, label: 'Natural range for coral', citation: 'PP 22/2021 Annex VIII' },
    demo: { base: 29.3, spread: 0.6, min: 26.5, max: 32.5, season: 0.015, noise: 0.006, absolute: true },
  },
];

export const ALL_PARAMETERS = [...AIR_PARAMETERS, ...OCEAN_PARAMETERS];
export const getParameter = (key) => ALL_PARAMETERS.find((p) => p.key === key);
export const parametersFor = (domain) => (domain === 'air' ? AIR_PARAMETERS : OCEAN_PARAMETERS);

/** Evaluate a value against its reference: 'good' | 'watch' | 'poor' | 'none'. */
export function assessValue(param, value) {
  const ref = param?.reference;
  if (!ref || value == null) return 'none';
  if (param.key === 'ispu') return value <= 50 ? 'good' : value <= 100 ? 'watch' : 'poor';
  if (ref.type === 'max') return value <= ref.value * 0.8 ? 'good' : value <= ref.value ? 'watch' : 'poor';
  if (ref.type === 'min') return value >= ref.value * 1.15 ? 'good' : value >= ref.value ? 'watch' : 'poor';
  if (ref.type === 'range') {
    if (value >= ref.min && value <= ref.max) return 'good';
    const span = ref.max - ref.min || 1;
    const dist = value < ref.min ? ref.min - value : value - ref.max;
    return dist <= span * 0.5 ? 'watch' : 'poor';
  }
  return 'none';
}

export const STATUS_LABEL = { good: 'Within reference', watch: 'Near limit', poor: 'Outside reference', none: 'No threshold' };
