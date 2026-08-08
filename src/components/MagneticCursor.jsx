// ============================================================
// CampusVerse OS — Magnetic Cursor
// GSAP-powered dual-layer cursor with magnetic pull effect
// ============================================================

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // ── Lift both elements off [0,0] so the initial jump is invisible ──
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    // ── Smooth ring follower using GSAP ticker + lerp ──
    const ringPos = { x: -200, y: -200 };
    const mouse   = { x: -200, y: -200 };
    const SPEED   = 0.14;

    const xSetter = gsap.quickSetter(ring, 'x', 'px');
    const ySetter = gsap.quickSetter(ring, 'y', 'px');

    const tickerHandler = () => {
      const dt  = 1 - Math.pow(1 - SPEED, gsap.ticker.deltaRatio());
      ringPos.x += (mouse.x - ringPos.x) * dt;
      ringPos.y += (mouse.y - ringPos.y) * dt;
      xSetter(ringPos.x);
      ySetter(ringPos.y);
    };

    // ── Cursor states on interactive elements ──
    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2, borderColor: '#6366f1', opacity: 0.6, duration: 0.35, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0.3, duration: 0.35 });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(99,102,241,0.8)', opacity: 1, duration: 0.35 });
      gsap.to(dot,  { scale: 1, duration: 0.35 });
    };

    // Track active elements via event delegation to support dynamic content and prevent memory leaks
    let activeInteractive = null;
    let activeMagnetic = null;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Dot snaps instantly
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.06, overwrite: true });

      // Apply magnetic pull if hovering a magnetic element
      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const relX = e.clientX - rect.left  - rect.width  / 2;
        const relY = e.clientY - rect.top   - rect.height / 2;
        gsap.to(activeMagnetic, { x: relX * 0.38, y: relY * 0.38, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Detect interactive elements
      const interactive = target.closest('a, button, [data-cursor], .cursor-pointer');
      if (interactive !== activeInteractive) {
        if (interactive) {
          onEnterInteractive();
        } else {
          onLeaveInteractive();
        }
        activeInteractive = interactive;
      }

      // Detect magnetic elements
      const magnetic = target.closest('[data-magnetic]');
      if (magnetic !== activeMagnetic) {
        if (activeMagnetic) {
          gsap.to(activeMagnetic, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' });
        }
        activeMagnetic = magnetic;
      }
    };

    // ── Bind event listeners globally ──
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    gsap.ticker.add(tickerHandler);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      gsap.ticker.remove(tickerHandler);

      if (activeMagnetic) {
        gsap.killTweensOf(activeMagnetic);
        gsap.set(activeMagnetic, { x: 0, y: 0 });
      }
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default MagneticCursor;
