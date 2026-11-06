import { Link } from 'react-router-dom';
import { SectionHeading, WaveDivider } from '../../components/ui/Basics.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { BranchCoral, BrainCoral, FanCoral, Seaweed, Bubbles, Fish } from '../../components/illustrations/Underwater.jsx';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

const ACTIONS = [
  {
    key: 'awareness',
    icon: 'info',
    title: 'Stay aware',
    text: 'Check the air quality before outdoor activities, and learn what the numbers mean for your family.',
    pledge: "I'll check ISPU before spending long periods outdoors",
  },
  {
    key: 'habits',
    icon: 'leaf',
    title: 'Sustainable habits',
    text: 'Walk, cycle or take public transport for short trips. Fewer engines mean less NO₂ and PM2.5 drifting over the bay.',
    pledge: "I'll swap one car or motorbike trip a week",
  },
  {
    key: 'coast',
    icon: 'shield',
    title: 'Protect the coast',
    text: 'Mangroves and seagrass trap sediment, shelter young fish and buffer waves. Support local restoration.',
    pledge: "I'll join or support a mangrove planting",
  },
  {
    key: 'pollution',
    icon: 'recycle',
    title: 'Cut pollution',
    text: 'Avoid open burning, sort your waste, and keep plastics and oil out of drains, because drains lead to rivers and rivers lead to the sea.',
    pledge: "I'll never burn waste in the open",
  },
  {
    key: 'community',
    icon: 'people',
    title: 'Join the community',
    text: 'Take part in beach clean-ups and citizen science, and share what you learn with your neighbours and school.',
    pledge: "I'll join a clean-up or share SEAIR with someone",
  },
];

const CORALS = [
  { C: BranchCoral, props: { color: '#FF927E', tip: '#FFC2B4' }, left: '6%', w: 120 },
  { C: BrainCoral, props: {}, left: '24%', w: 130 },
  { C: FanCoral, props: { color: '#70D6CE' }, left: '46%', w: 140 },
  { C: BranchCoral, props: { color: '#F4D6A0', tip: '#FCEBCB' }, left: '66%', w: 110 },
  { C: FanCoral, props: { color: '#FF927E' }, left: '82%', w: 120 },
];

export default function ActionSection() {
  const [pledges, setPledges] = useLocalStorage('seair:pledges', []);
  const toggle = (k) => setPledges((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const n = pledges.length;

  return (
    <section id="action" className="section action-section on-dark">
      <WaveDivider position="top" fill="var(--sea-foam)" flip />
      <Bubbles count={16} seed={21} />
      <div className="container">
        <SectionHeading eyebrow="Take action" title="Small actions, rising together" align="center">
          Every pledge you choose grows a coral in the reef below. Your choices are saved only in this browser, for you.
        </SectionHeading>

        <div className="action-grid">
          {ACTIONS.map((a, i) => {
            const on = pledges.includes(a.key);
            return (
              <article key={a.key} className={`action-card ${on ? 'is-on' : ''}`} data-reveal data-reveal-delay={i * 0.06}>
                <span className="icon-bubble">
                  <Icon name={a.icon} />
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <button className="action-card__pledge" aria-pressed={on} onClick={() => toggle(a.key)}>
                  <span className="action-card__check">{on && <Icon name="check" size={14} strokeWidth={3} />}</span>
                  {a.pledge}
                </button>
              </article>
            );
          })}
        </div>

        <div className="action-reef" aria-hidden="true">
          {CORALS.map(({ C, props, left, w }, i) => (
            <div key={i} className={`action-reef__coral ${i < n ? 'is-grown' : ''}`} style={{ left, width: w }}>
              <C {...props} />
            </div>
          ))}
          <Seaweed className="action-reef__weed" color="#087E8B" height={140} />
          <div className="swim" style={{ top: '10%', '--dur': '22s' }}>
            <Fish color="sand" style={{ width: 56 }} />
          </div>
          {n === ACTIONS.length && (
            <div className="swim swim--left" style={{ top: '30%', '--dur': '16s' }}>
              <Fish color="coral" style={{ width: 70 }} />
            </div>
          )}
        </div>
        <p className="action-count" aria-live="polite">
          {n === 0
            ? 'Pick a pledge to start growing your reef.'
            : n === ACTIONS.length
              ? 'Your reef is thriving — thank you!'
              : `${n} of ${ACTIONS.length} corals grown.`}
        </p>

        <div className="action-cta">
          <Link to="/explore" className="btn btn--coral">
            Explore your coast <Icon name="arrow" size={18} />
          </Link>
          <Link to="/about" className="btn btn--ghost">
            About SEAIR
          </Link>
        </div>
      </div>
    </section>
  );
}
