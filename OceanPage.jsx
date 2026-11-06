import { useRef, useState } from 'react';
import PageHero from '../components/layout/PageHero.jsx';
import DataExplorer from '../components/data/DataExplorer.jsx';
import OceanScene from '../components/data/OceanScene.jsx';
import StationCard from '../components/data/StationCard.jsx';
import EnvMap from '../components/map/EnvMap.jsx';
import DemoBadge from '../components/ui/DemoBadge.jsx';
import Icon from '../components/ui/Icon.jsx';
import { BarChart } from '../components/charts/Charts.jsx';
import { SectionHeading, StatusTag } from '../components/ui/Basics.jsx';
import { OCEAN_PARAMETERS, getParameter, assessValue } from '../data/parameters.js';
import { getLatestAll } from '../services/dataProvider.js';
import { useAsync } from '../hooks/useAsync.js';
import { useReveal } from '../animations/reveal.js';
import { STATUS_HEX } from '../utils/status.js';
import './pages.css';

function refText(p) {
  const r = p.reference;
  if (r.type === 'max') return `≤ ${r.value}`;
  if (r.type === 'min') return `≥ ${r.value}`;
  if (r.type === 'range') return `${r.min} – ${r.max}`;
  return '—';
}

export default function OceanPage() {
  const scope = useRef(null);
  const { data } = useAsync(() => getLatestAll('ocean'), []);
  const [param, setParam] = useState('do');
  const [station, setStation] = useState('ancol-sea');
  const p = getParameter(param);
  useReveal(scope);

  // Stations ordered from the inner bay outward (by distance from the coast).
  const ordered = data ? [...data].sort((a, b) => a.station.lat - b.station.lat) : [];
  const bars = ordered
    .slice()
    .reverse()
    .map((l) => {
      const v = l.values[param].value;
      return { label: l.station.name.replace(' Outer Harbour', ''), value: v, color: STATUS_HEX[assessValue(p, v)] };
    });

  return (
    <div ref={scope}>
      <PageHero variant="deep" eyebrow="Ocean quality · Teluk Jakarta" title="The ocean we share">
        Teluk Jakarta is a shallow bay fed by many rivers, a busy port and a city of millions. Its water changes a lot between the
        river mouths and the island reefs of Kepulauan Seribu.
      </PageHero>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Water conditions" title="From river mouth to island reef">
            Pick a parameter to compare all sampling points, ordered from the inner bay outward. Bar colours show whether each value
            is within the indicative reference.
          </SectionHeading>
          <div className="chip-row" role="group" aria-label="Parameter" style={{ marginBottom: 'var(--s-4)' }}>
            {OCEAN_PARAMETERS.map((q) => (
              <button key={q.key} className="chip" aria-pressed={param === q.key} onClick={() => setParam(q.key)}>
                {q.short || q.name}
              </button>
            ))}
          </div>
          <div className="card gradient-card" data-reveal>
            <div className="gradient-card__head">
              <h3>
                {p.name} <span className="muted">({p.unit})</span>
              </h3>
              <DemoBadge />
            </div>
            {bars.length > 0 && (
              <BarChart
                items={bars}
                unit={p.unit}
                decimals={p.decimals}
                reference={p.reference}
                height={320}
                ariaLabel={`${p.name} at each sampling point, demo data`}
              />
            )}
            <p className="tiny muted">
              Reference: {p.reference.label} {refText(p)} {p.reference.citation !== '—' && `(${p.reference.citation})`}
            </p>
          </div>
          <div className="station-grid" style={{ marginTop: 'var(--s-6)' }}>
            {ordered.map((l) => (
              <StationCard
                key={l.station.id}
                latest={l}
                keys={['do', 'tss', 'chla']}
                active={l.station.id === station}
                onSelect={() => setStation(l.station.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight band band--deep on-dark">
        <div className="container">
          <SectionHeading eyebrow="Inside the water column" title="Where each measurement lives" />
          <div className="ocean-page__scene">
            <OceanScene selected={param} onSelect={setParam} />
            <div className="card ocean-page__param" key={param}>
              <span className="icon-bubble">
                <Icon name={p.icon} />
              </span>
              <h3>{p.name}</h3>
              <p>{p.what}</p>
              <p className="small">
                <b>Why it matters:</b> {p.why}
              </p>
              <p className="small">
                <b>What changes it:</b> {p.source}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Reference" title="Parameters at a glance" />
          <div className="table-wrap" data-reveal>
            <table className="ref-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Unit</th>
                  <th>Indicative reference</th>
                  <th>Source of reference</th>
                  <th>{data?.find((l) => l.station.id === station)?.station.name || 'Selected'} (demo)</th>
                </tr>
              </thead>
              <tbody>
                {OCEAN_PARAMETERS.map((q) => {
                  const v = data?.find((l) => l.station.id === station)?.values[q.key].value;
                  return (
                    <tr key={q.key}>
                      <td>
                        <b>{q.name}</b>
                      </td>
                      <td>{q.unit}</td>
                      <td>
                        {refText(q)} <span className="muted small">{q.reference.label}</span>
                      </td>
                      <td>{q.reference.citation}</td>
                      <td>{v != null && <StatusTag status={assessValue(q, v)} label={v.toFixed(q.decimals)} />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="tiny muted">
            Reference values are indicative and must be checked against the official regulation text before real measurements are
            published.
          </p>
        </div>
      </section>

      <section className="section section--tight band band--foam">
        <div className="container">
          <SectionHeading eyebrow="History" title="Trends and comparisons" />
          <DataExplorer fixedDomain="ocean" key={station + param} initialStation={station} initialParam={param} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Sampling points" title="Where the water is measured" />
          <EnvMap initialLayer="ocean" height={480} />
        </div>
      </section>
    </div>
  );
}
