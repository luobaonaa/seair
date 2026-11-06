/**
 * Reference data sources for SEAIR. None is connected yet. `status` makes
 * that explicit in the UI, and `url` stays null until an official endpoint
 * or data-sharing agreement is confirmed.
 */
export const DATA_SOURCES = [
  {
    id: 'bmkg',
    name: 'BMKG',
    full: 'Badan Meteorologi, Klimatologi, dan Geofisika',
    covers: ['Weather & wind', 'Rainfall', 'Air quality (PM2.5 monitoring)', 'Marine meteorology'],
    domain: 'air',
    status: 'planned',
    url: 'https://www.bmkg.go.id',
  },
  {
    id: 'klh',
    name: 'KLH',
    full: 'Kementerian Lingkungan Hidup',
    covers: ['National ISPU', 'Ambient & seawater quality standards', 'Environmental monitoring'],
    domain: 'both',
    status: 'planned',
    url: null,
  },
  {
    id: 'ispu-jakarta',
    name: 'ISPU Jakarta',
    full: 'Air quality index — Provincial Environment Agency, DKI Jakarta',
    covers: ['SPKU stations DKI1–DKI5', 'PM10, PM2.5, SO₂, CO, O₃, NO₂'],
    domain: 'air',
    status: 'planned',
    url: null,
  },
  {
    id: 'unpad-podc',
    name: 'Unpad PODC',
    full: 'Universitas Padjadjaran — oceanographic data centre',
    covers: ['Sea surface temperature', 'Chlorophyll-a', 'Ocean colour & water quality'],
    domain: 'ocean',
    status: 'planned',
    url: null,
  },
];

export const SOURCE_STATUS = {
  planned: 'Planned integration',
  connected: 'Connected',
  demo: 'Demo data',
};
