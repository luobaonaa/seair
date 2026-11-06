/**
 * Monitoring locations for the Teluk Jakarta prototype.
 *
 * Coordinates are APPROXIMATE and used for demonstration only. The air
 * station names follow the publicly known SPKU (DKI1–DKI5) sites, but
 * every value SEAIR shows for them is DEMO data, not their measurements.
 * `pressure` (0–1) only shapes the demo generator (how urban/inner-bay
 * the site is). It is not a measured quantity.
 */
export const STATIONS = [
  // --- Air ------------------------------------------------------------
  { id: 'dki1', domain: 'air', name: 'Bundaran HI', area: 'Central Jakarta', lat: -6.195, lng: 106.823,
    kind: 'Urban roadside', pressure: 0.75, reference: 'Name of SPKU site DKI1 (demo values)' },
  { id: 'dki2', domain: 'air', name: 'Kelapa Gading', area: 'North Jakarta', lat: -6.154, lng: 106.91,
    kind: 'Urban residential', pressure: 0.65, reference: 'Name of SPKU site DKI2 (demo values)' },
  { id: 'dki3', domain: 'air', name: 'Jagakarsa', area: 'South Jakarta', lat: -6.357, lng: 106.803,
    kind: 'Suburban green', pressure: 0.4, reference: 'Name of SPKU site DKI3 (demo values)' },
  { id: 'dki4', domain: 'air', name: 'Lubang Buaya', area: 'East Jakarta', lat: -6.289, lng: 106.902,
    kind: 'Urban residential', pressure: 0.6, reference: 'Name of SPKU site DKI4 (demo values)' },
  { id: 'dki5', domain: 'air', name: 'Kebon Jeruk', area: 'West Jakarta', lat: -6.207, lng: 106.753,
    kind: 'Urban residential', pressure: 0.55, reference: 'Name of SPKU site DKI5 (demo values)' },
  { id: 'priok-air', domain: 'air', name: 'Tanjung Priok', area: 'Port area, North Jakarta', lat: -6.11, lng: 106.88,
    kind: 'Coastal / port', pressure: 0.9, reference: 'Illustrative coastal site (demo)' },
  { id: 'muara-air', domain: 'air', name: 'Muara Angke', area: 'Coastal, North Jakarta', lat: -6.108, lng: 106.772,
    kind: 'Coastal / fishing port', pressure: 0.7, reference: 'Illustrative coastal site (demo)' },

  // --- Ocean ----------------------------------------------------------
  { id: 'angke-sea', domain: 'ocean', name: 'Muara Angke Estuary', area: 'Inner Teluk Jakarta', lat: -6.088, lng: 106.765,
    kind: 'River mouth', pressure: 0.95, reference: 'Illustrative sampling point (demo)' },
  { id: 'ancol-sea', domain: 'ocean', name: 'Ancol Coast', area: 'Inner Teluk Jakarta', lat: -6.103, lng: 106.842,
    kind: 'Recreational coast', pressure: 0.8, reference: 'Illustrative sampling point (demo)' },
  { id: 'priok-sea', domain: 'ocean', name: 'Tanjung Priok Outer Harbour', area: 'Inner Teluk Jakarta', lat: -6.082, lng: 106.889,
    kind: 'Port waters', pressure: 0.85, reference: 'Illustrative sampling point (demo)' },
  { id: 'marunda-sea', domain: 'ocean', name: 'Marunda – Cilincing', area: 'Eastern Teluk Jakarta', lat: -6.078, lng: 106.955,
    kind: 'Industrial coast', pressure: 0.8, reference: 'Illustrative sampling point (demo)' },
  { id: 'midbay-sea', domain: 'ocean', name: 'Mid-Bay', area: 'Central Teluk Jakarta', lat: -6.0, lng: 106.85,
    kind: 'Open bay', pressure: 0.5, reference: 'Illustrative sampling point (demo)' },
  { id: 'untung-sea', domain: 'ocean', name: 'Pulau Untung Jawa', area: 'Kepulauan Seribu (south)', lat: -5.977, lng: 106.705,
    kind: 'Island reef', pressure: 0.35, reference: 'Illustrative sampling point (demo)' },
  { id: 'pari-sea', domain: 'ocean', name: 'Pulau Pari', area: 'Kepulauan Seribu', lat: -5.86, lng: 106.615,
    kind: 'Island reef', pressure: 0.12, reference: 'Illustrative sampling point (demo)' },
];

export const stationsFor = (domain) => STATIONS.filter((s) => s.domain === domain);
export const getStation = (id) => STATIONS.find((s) => s.id === id);

export const MAP_VIEWS = {
  bay: { center: [-6.05, 106.83], zoom: 11, label: 'Teluk Jakarta' },
  region: { center: [-6.05, 106.78], zoom: 10, label: 'Jakarta & Kepulauan Seribu' },
  indonesia: { center: [-2.4, 118], zoom: 5, label: 'Indonesia' },
};
