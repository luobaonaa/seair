import { Link } from 'react-router-dom';
import Logo from '../brand/Logo.jsx';
import { NAV_ITEMS } from './Navbar.jsx';
import { DATA_SOURCES, SOURCE_STATUS } from '../../data/sources.js';
import { Seaweed, BranchCoral, Bubbles } from '../illustrations/Underwater.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="footer__seabed" aria-hidden="true">
        <Bubbles count={8} seed={11} />
        <Seaweed className="footer__weed footer__weed--1" color="#087E8B" height={160} />
        <BranchCoral className="footer__coral" color="#FF927E" tip="#FFC2B4" />
        <Seaweed className="footer__weed footer__weed--2" color="#18A6A6" height={120} blades={2} />
      </div>
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo variant="light" size={44} />
          <p>
            SEAIR connects air quality and ocean quality data in one place, so people can see how the sky above Teluk Jakarta and
            the sea below it affect each other.
          </p>
          <p className="tiny footer__note">
            Prototype. Values shown are <strong>DEMO DATA</strong> until official sources are connected.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3>Navigate</h3>
          <ul>
            {NAV_ITEMS.map((n) => (
              <li key={n.to}>
                <Link to={n.to}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3>Data sources</h3>
          <ul>
            {DATA_SOURCES.map((s) => (
              <li key={s.id}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.name}
                  </a>
                ) : (
                  <span>{s.name}</span>
                )}
                <small>{SOURCE_STATUS[s.status]}</small>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href="mailto:hello@seair.example">hello@seair.example</a>
            </li>
            <li>
              <Link to="/about#methodology">Methodology</Link>
            </li>
            <li>
              <Link to="/about#integrity">Data integrity</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} SEAIR · Sky to Sea</span>
        <span>Prototype focus: Teluk Jakarta, Indonesia</span>
      </div>
    </footer>
  );
}
