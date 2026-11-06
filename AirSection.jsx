import { Link } from 'react-router-dom';
import { Cloud } from '../../components/illustrations/Sky.jsx';
import ParamCard from '../../components/data/ParamCard.jsx';
import IspuScale from '../../components/data/IspuScale.jsx';
import DemoBadge from '../../components/ui/DemoBadge.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { AIR_PARAMETERS } from '../../data/parameters.js';
import { getLatest } from '../../services/dataProvider.js';
import { useAsync } from '../../hooks/useAsync.js';
import { formatDateTime } from '../../utils/format.js';

const STATION = 'priok-air';

export default function AirSection() {
  const { data } = useAsync(() => getLatest(STATION), []);
  const v = (k) => data?.values[k]?.value;
  return (
    <section id="air" className="section air-section">
      <div className="air-section__clouds" aria-hidden="true">
        <div className="drift" style={{ top: '8%', '--dur': '120s', '--delay': '-40s' }}>
          <Cloud shape="b" style={{ width: 240, opacity: 0.9 }} />
        </div>
        <div className="drift" style={{ top: '46%', '--dur': '150s', '--delay': '-100s' }}>
          <Cloud shape="a" style={{ width: 300, opacity: 0.7 }} />
        </div>
      </div>
      <div className="container air-section__grid">
        <div className="air-section__intro">
          <header className="section-heading" data-reveal>
            <span className="eyebrow">Understanding our air</span>
            <h2 className="title-xl">What is in the air above the bay?</h2>
            <p className="lede">
              Indonesia reports air quality as <b>ISPU</b>, an index built from several pollutants. Here are the main ones,
              with sample readings for a coastal station near Tanjung Priok.
            </p>
          </header>
          <div className="card card--glass air-section__ispu" data-reveal>
            <div className="air-section__ispu-head">
              <h3>ISPU scale</h3>
              <DemoBadge compact />
            </div>
            <IspuScale value={v('ispu')} />
            <p className="tiny muted">
              Categories: PermenLHK P.14/2020. Sample value for Tanjung Priok{data ? ` · ${formatDateTime(data.t)}` : ''}.
            </p>
          </div>
          <Link to="/air" className="btn" data-reveal>
            Dive into air quality <Icon name="arrow" size={18} />
          </Link>
        </div>

        <div className="air-section__cards">
          {AIR_PARAMETERS.filter((p) => p.key !== 'ispu').map((p, i) => (
            <ParamCard key={p.key} param={p} value={v(p.key)} tone="air" revealDelay={(i % 2) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
