import { Link } from 'react-router-dom';
import Deferred from '../../components/ui/Deferred.jsx';
import { lazyWithReload as lazy } from '../../utils/lazyWithReload.js';
import { SectionHeading, WaveDivider } from '../../components/ui/Basics.jsx';
import Icon from '../../components/ui/Icon.jsx';

const DataExplorer = lazy(() => import('../../components/data/DataExplorer.jsx'));

export default function DataSection() {
  return (
    <section id="data" className="section data-section">
      <WaveDivider position="top" fill="var(--deep-ocean)" flip />
      <div className="container">
        <SectionHeading eyebrow="Explore the data" title="Follow the numbers over time">
          Switch between air and ocean, pick a location and period, and compare two places side by side. Dashed lines and
          shaded bands show the national reference values.
        </SectionHeading>
        <Deferred minHeight={640}>
          <DataExplorer />
        </Deferred>
        <p className="data-section__more" data-reveal>
          Want to know how air and sea change together?{' '}
          <Link to="/insights">
            Read the insights <Icon name="arrow" size={16} />
          </Link>
        </p>
      </div>
    </section>
  );
}
