import { useState } from 'react';
import { Link } from 'react-router-dom';
import OceanScene from '../../components/data/OceanScene.jsx';
import DemoBadge from '../../components/ui/DemoBadge.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { StatusTag, WaveDivider } from '../../components/ui/Basics.jsx';
import { OCEAN_PARAMETERS, getParameter, assessValue } from '../../data/parameters.js';
import { getLatest } from '../../services/dataProvider.js';
import { useAsync } from '../../hooks/useAsync.js';
import { formatValue } from '../../utils/format.js';

const INNER = 'ancol-sea';
const OUTER = 'pari-sea';

function refText(p) {
  const r = p.reference;
  if (r.type === 'max') return `≤ ${r.value} ${p.unit}`;
  if (r.type === 'min') return `≥ ${r.value} ${p.unit}`;
  if (r.type === 'range') return `${r.min}–${r.max} ${p.unit}`;
  return r.label;
}

export default function OceanSection() {
  const [sel, setSel] = useState('do');
  const p = getParameter(sel);
  const { data } = useAsync(() => Promise.all([getLatest(INNER), getLatest(OUTER)]), []);

  return (
    <section id="ocean" className="section ocean-section on-dark">
      <WaveDivider position="top" fill="var(--sky-soft)" flip />
      <div className="container">
        <header className="section-heading" data-reveal>
          <span className="eyebrow">Understanding our ocean</span>
          <h2 className="title-xl">Reading the water, from surface to seabed</h2>
          <p className="lede">
            Six measurements describe the health of a bay. Tap a number in the scene to see where it fits and how the inner bay
            compares with an offshore island reef.
          </p>
        </header>

        <div className="ocean-section__grid">
          <div data-reveal="left">
            <OceanScene selected={sel} onSelect={setSel} />
            <div className="chip-row ocean-section__tabs" role="group" aria-label="Ocean parameter">
              {OCEAN_PARAMETERS.map((q, i) => (
                <button key={q.key} className="chip" aria-pressed={sel === q.key} onClick={() => setSel(q.key)}>
                  {i + 1}. {q.short || q.name}
                </button>
              ))}
            </div>
          </div>

          <article className="ocean-detail card" key={sel} data-reveal="right">
            <div className="ocean-detail__head">
              <span className="icon-bubble">
                <Icon name={p.icon} />
              </span>
              <div>
                <h3>{p.name}</h3>
                <p className="small muted">
                  {p.full} · unit: <b>{p.unit}</b>
                </p>
              </div>
            </div>
            <p>{p.what}</p>
            <p className="small">
              <b>Why it matters:</b> {p.why}
            </p>
            <p className="small">
              <b>What changes it:</b> {p.source}
            </p>

            <div className="ocean-detail__compare">
              {data &&
                data.map((l) => {
                  const val = l.values[sel].value;
                  return (
                    <div key={l.station.id} className="ocean-detail__site">
                      <span className="tiny muted">{l.station.id === INNER ? 'Inner bay' : 'Offshore reef'}</span>
                      <b>{l.station.name}</b>
                      <span className="ocean-detail__val">
                        {formatValue(val, p.decimals)} <small>{p.unit}</small>
                      </span>
                      <StatusTag status={assessValue(p, val)} />
                    </div>
                  );
                })}
            </div>

            <div className="ocean-detail__foot">
              <span className="tiny muted">
                Reference: {refText(p)}
                {p.reference.citation !== '—' && ` · ${p.reference.label} · ${p.reference.citation}`}
              </span>
              <DemoBadge />
            </div>
            <Link to="/ocean" className="btn btn--sm">
              Explore ocean quality <Icon name="arrow" size={16} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
