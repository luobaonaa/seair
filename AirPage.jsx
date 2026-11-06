import { useRef, useState } from 'react';
import PageHero from '../components/layout/PageHero.jsx';
import DataExplorer from '../components/data/DataExplorer.jsx';
import ParamCard from '../components/data/ParamCard.jsx';
import IspuScale from '../components/data/IspuScale.jsx';
import StationCard from '../components/data/StationCard.jsx';
import EnvMap from '../components/map/EnvMap.jsx';
import DemoBadge from '../components/ui/DemoBadge.jsx';
import { SectionHeading } from '../components/ui/Basics.jsx';
import { AIR_PARAMETERS } from '../data/parameters.js';
import { getLatestAll } from '../services/dataProvider.js';
import { useAsync } from '../hooks/useAsync.js';
import { useReveal } from '../animations/reveal.js';
import { formatDateTime } from '../utils/format.js';
import './pages.css';

const STEPS = [
  { n: 1, t: 'Measure', d: 'Monitoring stations record pollutant concentrations, typically every hour.' },
  { n: 2, t: 'Average', d: 'Each pollutant is averaged over its standard period, for example 24 hours for particles.' },
  { n: 3, t: 'Sub-index', d: 'Each concentration is converted to a 0–500 sub-index using official breakpoints.' },
  { n: 4, t: 'Report', d: 'The highest sub-index becomes the ISPU, and that pollutant is reported as the dominant one.' },
];

export default function AirPage() {
  const scope = useRef(null);
  const { data } = useAsync(() => getLatestAll('air'), []);
  const [sel, setSel] = useState('priok-air');
  const current = data?.find((l) => l.station.id === sel);
  useReveal(scope);

  return (
    <div ref={scope}>
      <PageHero
        variant="sky"
        eyebrow="Air quality · Jakarta coast"
        title="The air we breathe"
        aside={
          current && (
            <div className="card card--glass hero-reading">
              <div className="hero-reading__head">
                <span className="tiny muted">{current.station.name}</span>
                <DemoBadge compact />
              </div>
              <span className="hero-reading__value">{current.values.ispu.value}</span>
              <span className="small muted">ISPU · {formatDateTime(current.t)}</span>
              <IspuScale value={current.values.ispu.value} />
            </div>
          )
        }
      >
        Above Teluk Jakarta, emissions from traffic, ports and industry mix with sea breezes. Click the sky for a gust and move
        your cursor to stir the wind.
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Stations" title="Today across Jakarta">
            Select a station to update the reading above. Coastal stations are included to follow air moving over the bay.
          </SectionHeading>
          <div className="station-grid">
            {data?.map((l) => (
              <StationCard key={l.station.id} latest={l} keys={['pm25', 'no2']} active={l.station.id === sel} onSelect={() => setSel(l.station.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight band band--sky">
        <div className="container">
          <SectionHeading eyebrow="How ISPU works" title="From a sensor reading to a single number" />
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} data-reveal>
                <span className="steps__n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="card ispu-advice" data-reveal>
            <h3>What each category means</h3>
            <IspuScale value={current?.values.ispu.value} showAdvice />
            <p className="tiny muted">
              Categories follow PermenLHK P.14/2020. SEAIR derives an illustrative ISPU from demo PM2.5 and PM10 values only.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Parameters" title="Seven numbers, one sky">
            Hover or tap a card to see where each pollutant comes from and why it matters for people and the sea. The values shown
            are for {current?.station.name || 'the selected station'}.
          </SectionHeading>
          <div className="param-grid">
            {AIR_PARAMETERS.map((p, i) => (
              <ParamCard key={p.key} param={p} value={current?.values[p.key].value} revealDelay={(i % 3) * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight band band--foam">
        <div className="container">
          <SectionHeading eyebrow="History" title="Trends and comparisons" />
          <DataExplorer fixedDomain="air" key={sel} initialStation={sel} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Measurement locations" title="Where the air is measured" />
          <EnvMap initialLayer="air" height={480} />
        </div>
      </section>
    </div>
  );
}
