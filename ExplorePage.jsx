import PageHero from '../components/layout/PageHero.jsx';
import EnvMap from '../components/map/EnvMap.jsx';
import Icon from '../components/ui/Icon.jsx';
import './pages.css';

const TIPS = [
  { icon: 'wind', t: 'Air layer', d: 'Land-based stations. Marker colour follows the ISPU category.' },
  { icon: 'wave', t: 'Ocean layer', d: 'Sampling points in the bay. Colour shows the worst parameter against its reference.' },
  { icon: 'pin', t: 'Combined', d: 'Both together, to see which coastal air and nearby water may influence each other.' },
];

export default function ExplorePage() {
  return (
    <div>
      <PageHero variant="surface" eyebrow="Explore" title="Explore our environment">
        Pan, zoom and switch layers to explore air and ocean conditions around Teluk Jakarta. Scroll-zoom is enabled on this page.
      </PageHero>
      <section className="section section--tight explore-page">
        <div className="container">
          <EnvMap initialLayer="combined" height={680} fullPage />
          <ul className="tips">
            {TIPS.map((t) => (
              <li key={t.t}>
                <span className="icon-bubble">
                  <Icon name={t.icon} />
                </span>
                <div>
                  <h3>{t.t}</h3>
                  <p>{t.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="tiny muted">
            Locations are approximate and every value is demo data. Map data © OpenStreetMap contributors.
          </p>
        </div>
      </section>
    </div>
  );
}
