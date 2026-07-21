'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { prefersReducedMotion } from '@/lib/gsap';

interface SteamProps {
  className?: string;
  intensity?: number;
  originX?: number;
  spread?: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  life: number;
  maxLife: number;
  drift: number;
  phase: number;
}

/**
 * Canvas steam: soft cream wisps rising with sinusoidal drift. Pauses
 * offscreen; renders nothing under reduced motion.
 */
export function Steam({
  className,
  intensity = 1,
  originX = 0.5,
  spread = 0.3,
}: SteamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];
    const COUNT = Math.round(26 * intensity);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (p?: Particle): Particle => {
      const maxLife = 240 + Math.random() * 220;
      const next: Particle = p ?? ({} as Particle);
      next.x = width * (originX + (Math.random() - 0.5) * spread * 2);
      next.y = height * (0.88 + Math.random() * 0.12);
      next.r = 14 + Math.random() * 30;
      next.vy = 0.35 + Math.random() * 0.55;
      next.life = Math.random() * maxLife;
      next.maxLife = maxLife;
      next.drift = 14 + Math.random() * 26;
      next.phase = Math.random() * Math.PI * 2;
      return next;
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (const p of particles) {
        p.life += 1;
        if (p.life >= p.maxLife) spawn(p);

        const t = p.life / p.maxLife;
        const y = p.y - p.vy * p.life * 0.9;
        const x = p.x + Math.sin(p.phase + p.life * 0.012) * p.drift * t;
        const r = p.r * (0.6 + t * 1.5);
        const alpha = Math.min(t * 5, 1) * (1 - t) * 0.075;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(238, 226, 208, ${alpha})`);
        g.addColorStop(1, 'rgba(238, 226, 208, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(spawn());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [intensity, originX, spread]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
