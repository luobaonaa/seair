import { Cloud, Sun, Bird } from '../../components/illustrations/Sky.jsx';
import { Fish, BranchCoral, Seaweed, Bubbles } from '../../components/illustrations/Underwater.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { WaveDivider } from '../../components/ui/Basics.jsx';

const LINKS = [
  { icon: 'bubble', title: 'Gas exchange', text: 'Oxygen and CO₂ move across the sea surface in both directions.' },
  { icon: 'dust', title: 'Deposition', text: 'Particles, nitrogen and metals in the air settle or rain out onto the water.' },
  { icon: 'sun', title: 'Heat & moisture', text: 'Air and sea trade heat and water vapour, which drives monsoons and weather.' },
];

export default function TwoWorlds() {
  return (
    <section id="two-worlds" className="section two-worlds on-dark">
      <div className="container">
        <header className="section-heading section-heading--center" data-reveal>
          <span className="eyebrow">One planet, two ecosystems</span>
          <h2 className="title-xl">Two Worlds. One Living System.</h2>
          <p className="lede">
            The atmosphere and the ocean are usually studied separately, but they meet along millions of kilometres of sea surface.
            What happens in one is soon felt in the other.
          </p>
        </header>

        <div className="split">
          <article className="split__panel split__panel--air" data-reveal="left">
            <div className="split__scene" aria-hidden="true">
              <Sun className="split__sun" />
              <div className="drift" style={{ top: '18%', '--dur': '40s', '--delay': '-10s' }}>
                <Cloud shape="a" style={{ width: 160 }} />
              </div>
              <div className="drift" style={{ top: '46%', '--dur': '55s', '--delay': '-30s' }}>
                <Cloud shape="c" style={{ width: 110 }} />
              </div>
              <Bird className="split__bird" />
              <svg className="split__wind" viewBox="0 0 300 80">
                <path d="M10 30 H200 a20 20 0 1 0 -20 -20" />
                <path d="M40 60 H250 a16 16 0 1 1 -16 16" />
              </svg>
            </div>
            <div className="split__body">
              <span className="split__tag">
                <Icon name="wind" size={18} /> The Atmosphere
              </span>
              <h3>The air we breathe</h3>
              <ul>
                <li>A thin layer of gases that carries heat, moisture and pollutants across whole regions.</li>
                <li>Wind can carry emissions from cities, ports and industry far out over the sea.</li>
                <li>
                  Measured as <b>ISPU</b> plus pollutants such as <b>PM2.5</b>, <b>SO₂</b> and <b>NO₂</b>.
                </li>
              </ul>
            </div>
          </article>

          <div className="split__bridge" data-reveal="scale" aria-hidden="true">
            <span className="split__arrow split__arrow--down">↓</span>
            <span className="split__core">
              <Icon name="wave" size={30} />
            </span>
            <span className="split__arrow split__arrow--up">↑</span>
          </div>

          <article className="split__panel split__panel--ocean" data-reveal="right">
            <div className="split__scene" aria-hidden="true">
              <Bubbles count={10} seed={5} />
              <div className="swim" style={{ top: '22%', '--dur': '18s' }}>
                <Fish color="coral" style={{ width: 70 }} />
              </div>
              <div className="swim swim--left" style={{ top: '50%', '--dur': '24s', '--delay': '-9s' }}>
                <Fish color="sand" style={{ width: 52 }} />
              </div>
              <BranchCoral className="split__coral" />
              <Seaweed className="split__weed" color="#70D6CE" height={120} />
            </div>
            <div className="split__body">
              <span className="split__tag">
                <Icon name="wave" size={18} /> The Ocean
              </span>
              <h3>The ocean we share</h3>
              <ul>
                <li>It has absorbed more than 90% of the excess heat trapped by greenhouse gases.</li>
                <li>It takes up a large share of human CO₂ emissions, and that slowly lowers seawater pH.</li>
                <li>
                  Measured through <b>pH</b>, <b>dissolved oxygen</b>, <b>salinity</b>, <b>chlorophyll-a</b> and more.
                </li>
              </ul>
            </div>
          </article>
        </div>

        <ul className="links">
          {LINKS.map((l, i) => (
            <li key={l.title} data-reveal data-reveal-delay={i * 0.1}>
              <span className="icon-bubble">
                <Icon name={l.icon} />
              </span>
              <div>
                <h4>{l.title}</h4>
                <p>{l.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <WaveDivider position="bottom" fill="var(--sky)" back="rgba(168,223,240,.35)" />
    </section>
  );
}
