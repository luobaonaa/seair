import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useAnimationFrame, useInView, usePrefersReducedMotion } from '../../hooks/useMotion.js';

/**
 * Hosts a canvas animation engine (WindField, WaveSurface…).
 * The engine instance is exposed through the forwarded ref so parents can
 * route pointer events to it. Rendering pauses while off-screen.
 */
const EngineCanvas = forwardRef(function EngineCanvas({ Engine, options, className = '', paused = false, onReady }, ref) {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(canvasRef, '0px');
  const [ready, setReady] = useState(false);

  useImperativeHandle(ref, () => engineRef.current, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, { ...options, reduced });
    engineRef.current = engine;
    setReady(true);
    onReady?.(engine);
    const ro = new ResizeObserver(() => engine.resize());
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Engine, reduced]);

  useAnimationFrame((dt) => {
    const e = engineRef.current;
    if (!e) return;
    e.step(dt);
    e.draw();
  }, ready && inView && !paused);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

export default EngineCanvas;
