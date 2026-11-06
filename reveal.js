import { useEffect } from 'react';
import { prefersReducedMotion } from './gsap.js';

const CLASSES = ['reveal', 'reveal--up', 'reveal--left', 'reveal--right', 'reveal--scale', 'is-in'];

/**
 * Fades/slides in every [data-reveal] element inside `scopeRef` as it enters
 * the viewport (CSS transitions, see global.css).
 *   data-reveal="left" | "right" | "scale" | "" (up), data-reveal-delay="0.1"
 *
 * - IntersectionObserver: no cached scroll positions, so content that loads
 *   asynchronously and changes the page height is handled correctly.
 * - MutationObserver: elements rendered later are picked up automatically.
 * - Nothing is hidden unless JS runs, and reduced-motion users see no motion.
 */
export function useReveal(scopeRef) {
  useEffect(() => {
    const root = scopeRef.current;
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const narrow = window.innerWidth < 760; // side slides would widen the page on phones

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          el.style.transitionDelay = `${Number(el.dataset.revealDelay || 0)}s`;
          el.classList.add('is-in');
          const done = () => {
            el.classList.remove(...CLASSES);
            el.style.transitionDelay = '';
            el.dataset.revealReady = 'done';
          };
          el.addEventListener('transitionend', done, { once: true });
          setTimeout(done, 1600); // safety net if transitionend never fires
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.01 }
    );

    const prep = (el) => {
      if (el.dataset.revealReady) return;
      let kind = el.dataset.reveal;
      if (!['left', 'right', 'scale'].includes(kind)) kind = 'up'; // bare attribute arrives as "true"
      if (narrow && (kind === 'left' || kind === 'right')) kind = 'up';
      el.dataset.revealReady = 'pending';
      el.classList.add('reveal', `reveal--${kind}`);
      io.observe(el);
    };

    root.querySelectorAll('[data-reveal]').forEach(prep);
    const mo = new MutationObserver(() => root.querySelectorAll('[data-reveal]:not([data-reveal-ready])').forEach(prep));
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.querySelectorAll('[data-reveal-ready="pending"]').forEach((el) => {
        el.classList.remove(...CLASSES);
        delete el.dataset.revealReady;
      });
    };
  }, [scopeRef]);
}
