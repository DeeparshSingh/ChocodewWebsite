'use client';

import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Keeps GSAP ScrollTrigger in lockstep with Lenis, and re-measures triggers
 * whenever the document grows or shrinks (client-only sections mounting,
 * images loading) so scroll animations never fire off stale positions.
 */
function SyncScrollTrigger() {
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    let raf = 0;
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

/**
 * Lenis smooth scroll. Lenis drives its own rAF loop (autoRaf) so scrolling
 * can never freeze waiting on an external ticker. Reduced motion collapses to
 * native-feel scrolling. DOM is identical either way (root mode), so no
 * hydration shift.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = prefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: reduce ? 1 : 0.11,
        smoothWheel: !reduce,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: true,
      }}
    >
      <SyncScrollTrigger />
      {children}
    </ReactLenis>
  );
}
