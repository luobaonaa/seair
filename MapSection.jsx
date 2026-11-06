import { Link } from 'react-router-dom';
import Deferred from '../../components/ui/Deferred.jsx';
import { lazyWithReload as lazy } from '../../utils/lazyWithReload.js';
import { SectionHeading, WaveDivider } from '../../components/ui/Basics.jsx';
import Icon from '../../components/ui/Icon.jsx';

const EnvMap = lazy(() => import('../../components/map/EnvMap.jsx'));

export default function MapSection() {
  return (
    <section id="map" className="section map-section">
      <WaveDivider position="top" fill="var(--cloud)" flip />
      <div className="container">
        <div className="map-section__head">
          <SectionHeading eyebrow="Explore our environment" title="A living map of Teluk Jakarta">
            Air stations on land and sampling points at sea, in one view. Switch layers, then select a marker to see what it
            measures. Zoom out to see Indonesia; more regions will follow.
          </SectionHeading>
          <Link to="/explore" className="btn btn--light" data-reveal>
            Full-screen map <Icon name="arrow" size={18} />
          </Link>
        </div>
        <Deferred minHeight={560}>
          <EnvMap height={560} />
        </Deferred>
      </div>
    </section>
  );
}
