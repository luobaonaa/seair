/**
 * ISPU (Indeks Standar Pencemar Udara) helpers.
 * Category bands follow PermenLHK No. P.14/2020. The sub-index breakpoints
 * below are used ONLY to derive an illustrative ISPU from demo concentrations;
 * verify them against the regulation before using real data.
 */
export const ISPU_CATEGORIES = [
  { key: 'good', id: 'Baik', en: 'Good', min: 0, max: 50, color: 'var(--ispu-good)', hex: '#3fae6a',
    advice: 'Air quality is good for people and the environment.' },
  { key: 'moderate', id: 'Sedang', en: 'Moderate', min: 51, max: 100, color: 'var(--ispu-moderate)', hex: '#3b8fd9',
    advice: 'Acceptable for most people; sensitive groups may want to limit long outdoor exertion.' },
  { key: 'unhealthy', id: 'Tidak Sehat', en: 'Unhealthy', min: 101, max: 200, color: 'var(--ispu-unhealthy)', hex: '#f2c230',
    advice: 'Can affect sensitive groups and harm plants and animals. Reduce outdoor activity.' },
  { key: 'very', id: 'Sangat Tidak Sehat', en: 'Very unhealthy', min: 201, max: 300, color: 'var(--ispu-very)', hex: '#e5533d',
    advice: 'Health risk increases for everyone. Avoid outdoor activity.' },
  { key: 'hazard', id: 'Berbahaya', en: 'Hazardous', min: 301, max: 500, color: 'var(--ispu-hazard)', hex: '#2d2d2d',
    advice: 'Serious health risk. Stay indoors and follow official guidance.' },
];

export function ispuCategory(value) {
  const v = Math.round(value);
  return ISPU_CATEGORIES.find((c) => v <= c.max) || ISPU_CATEGORIES[ISPU_CATEGORIES.length - 1];
}

// Concentration breakpoints (µg/m³, 24-h) mapped to ISPU 0/50/100/200/300/500.
const BREAKPOINTS = {
  pm25: [0, 15.5, 55.4, 150.4, 250.4, 500],
  pm10: [0, 50, 150, 350, 420, 500],
};
const INDEX = [0, 50, 100, 200, 300, 500];

export function subIndex(param, conc) {
  const bp = BREAKPOINTS[param];
  if (!bp) return null;
  for (let i = 1; i < bp.length; i++) {
    if (conc <= bp[i]) {
      return INDEX[i - 1] + ((INDEX[i] - INDEX[i - 1]) * (conc - bp[i - 1])) / (bp[i] - bp[i - 1]);
    }
  }
  return 500;
}

/** Illustrative ISPU = highest sub-index of the particulate parameters. */
export const illustrativeISPU = (pm25, pm10) => Math.round(Math.max(subIndex('pm25', pm25), subIndex('pm10', pm10)));
