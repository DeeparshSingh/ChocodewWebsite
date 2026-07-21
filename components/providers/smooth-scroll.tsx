'use client';

import 'lenis/dist/lenis.css';
import { ReactLenis, useLenis } from 'lenis/react';
import { ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

/**
 * Keeps GSAP ScrollTrigger in lockstep with Lenis. Rendered inside the
 * ReactLenis provider so the hook only binds to a live instance.
 */
function SyncScrollTrigger() {
  useLenis(() => ScrollTrigger.update());
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
