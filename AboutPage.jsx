import { useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import Icon from '../components/ui/Icon.jsx';
import DemoBadge from '../components/ui/DemoBadge.jsx';
import { SectionHeading } from '../components/ui/Basics.jsx';
import { DATA_SOURCES, SOURCE_STATUS } from '../data/sources.js';
import { useReveal } from '../animations/reveal.js';
import { dataMode } from '../services/dataProvider.js';
import './pages.css';

const GOALS = [
  { icon: 'info', t: 'Inform', d: 'Introduce the condition of the air and sea to the public in plain language.' },
  { icon: 'gauge', t: 'Show', d: 'Present air and ocean quality data side by side, with sources, units, times and locations.' },
  { icon: 'wave', t: 'Track change', d: 'Help people see how conditions shift across days, seasons and years.' },
  { icon: 'river', t: 'Connect', d: 'Explain the known links between the atmosphere and marine ecosystems.' },
  { icon: 'leaf', t: 'Visualise', d: 'Turn complex data into illustrated, easy-to-read visuals.' },
  { icon: 'people', t: 'Involve', d: 'Encourage awareness and community participation in protecting the coast.' },
];

const USERS = ['General public', 'Students', 'Environmental communities', 'Researchers', 'Coastal communities', 'Decision makers'];

const PIPELINE = [
  { t: 'Collect', d: 'Fetch from official sources (BMKG, KLH, ISPU Jakarta, Unpad PODC) through their APIs or published datasets.' },
  { t: 'Validate', d: 'Check units, timestamps and ranges, and flag gaps or suspicious values instead of silently filling them.' },
  { t: 'Standardise', d: 'Convert to one data envelope: source, retrieval time, location, unit and value.' },
  { t: 'Compare', d: 'Read values against national references (PP 22/2021, PermenLHK P.14/2020) as indicative guides.' },
  { t: 'Visualise', d: 'Show trends, maps and side-by-side comparisons, always labelled with their source and time.' },
];

const PRINCIPLES = [
  'Real data must always show its source, retrieval time, unit and location.',
  'Demo data is always labelled DEMO DATA and is never presented as real-time.',
  'Reference thresholds are indicative and cited, and must be checked against the official texts.',
  'Correlations are shown as patterns, never as proof of cause and effect.',
  'Approximate locations are marked as approximate.',
];

export default function AboutPage() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <div ref={scope}>
      <PageHero variant="surface" eyebrow="About SEAIR" title="Sea + Air, one ecosystem">
        Understanding the connection between the air we breathe and the ocean we share.
      </PageHero>

      <section className="section section--tight">
        <div className="container about-intro">
          <div data-reveal>
            <span className="eyebrow">Mission</span>
            <h2 className="title-lg">An environmental platform that feels like exploring, not reading a spreadsheet</h2>
          </div>
          <div data-reveal>
            <p className="lede">
              SEAIR brings air quality and sea quality into one digital ecosystem, so people can see how they are connected. The
              prototype focuses on <b>Teluk Jakarta</b> and its coast, where a megacity, a major port and a shallow bay meet.
            </p>
            <div className="chip-row">
              {USERS.map((u) => (
                <span key={u} className="chip">
                  {u}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight band band--sky">
        <div className="container">
          <SectionHeading eyebrow="Goals" title="What SEAIR sets out to do" />
          <div className="goal-grid">
            {GOALS.map((g, i) => (
              <article key={g.t} className="card goal-card" data-reveal data-reveal-delay={(i % 3) * 0.06}>
                <span className="icon-bubble">
                  <Icon name={g.icon} />
                </span>
                <h3>{g.t}</h3>
                <p className="small muted">{g.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="section section--tight">
        <div className="container">
          <SectionHeading eyebrow="Methodology" title="From source to screen" />
          <ol className="steps steps--5">
            {PIPELINE.map((s, i) => (
              <li key={s.t} data-reveal>
                <span className="steps__n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="sources" className="section section--tight band band--foam">
        <div className="container">
          <SectionHeading eyebrow="Data sources" title="Where the data will come from">
            Current mode: <b>{dataMode === 'demo' ? 'Demo data' : 'Live API'}</b>. None of the sources below is connected yet.
          </SectionHeading>
          <div className="table-wrap" data-reveal>
            <table className="ref-table">
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Institution</th>
                  <th>Covers</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {DATA_SOURCES.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <b>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.name}</a> : s.name}</b>
                    </td>
                    <td>{s.full}</td>
                    <td>{s.covers.join(', ')}</td>
                    <td>
                      <span className="status-tag">
                        <i style={{ background: 'var(--status-watch)' }} />
                        {SOURCE_STATUS[s.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="integrity" className="section section--tight">
        <div className="container integrity">
          <div data-reveal>
            <span className="eyebrow">Data integrity</span>
            <h2 className="title-lg">Honest about every number</h2>
            <p className="muted">
              Until real sources are connected, every value in SEAIR is generated in your browser and labelled like this:
            </p>
            <DemoBadge />
          </div>
          <ul className="principles" data-reveal>
            {PRINCIPLES.map((p) => (
              <li key={p}>
                <Icon name="check" size={18} strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight band band--deep on-dark">
        <div className="container about-contact">
          <div>
            <h2 className="title-lg">Want to contribute data or ideas?</h2>
            <p>We would love to hear from researchers, agencies and coastal communities.</p>
          </div>
          <div className="about-contact__actions">
            <a href="mailto:hello@seair.example" className="btn btn--coral">
              hello@seair.example
            </a>
            <Link to="/explore" className="btn btn--ghost">
              Explore the map
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
