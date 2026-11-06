import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';

export default function NotFound() {
  return (
    <PageHero variant="deep" eyebrow="404 · Lost at sea" title="This page drifted away">
      The current carried this page somewhere we can't find. <Link to="/">Swim back home</Link>.
    </PageHero>
  );
}
