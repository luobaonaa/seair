import { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './animations/gsap.js';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import { lazyWithReload as lazy, clearChunkReloadFlag } from './utils/lazyWithReload.js';

// Secondary pages are split into their own chunks.
const AirPage = lazy(() => import('./pages/AirPage.jsx'));
const OceanPage = lazy(() => import('./pages/OceanPage.jsx'));
const ExplorePage = lazy(() => import('./pages/ExplorePage.jsx'));
const InsightsPage = lazy(() => import('./pages/InsightsPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
        return;
      }
    }
    window.scrollTo(0, 0);
    // Let pinned sections recalculate after the new page lays out.
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [pathname, hash]);
  return null;
}

function PageFallback() {
  return (
    <div className="page-loading" role="status">
      <span className="page-loading__bubble" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const id = setTimeout(clearChunkReloadFlag, 5000);
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Navbar />
      <main id="main">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/air" element={<AirPage />} />
            <Route path="/ocean" element={<OceanPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
