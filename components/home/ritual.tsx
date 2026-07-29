"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Choose",
    body: "Cappuccino, cutting chai, cardamom, soup. Pick from up to seven beverages on a one-touch panel. No barista, no queue, no guesswork.",
  },
  {
    n: "02",
    title: "Brew",
    body: "The machine doses the premix to the gram, draws filtered water at the right temperature, and pours a precise, consistent cup in about 25 seconds.",
  },
  {
    n: "03",
    title: "Sip",
    body: "The same perfect cup at 9 am and 9 pm, for the fifth person or the five-hundredth. That consistency is the whole point.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// liquid geometry inside the cup clip: empty at y=150, brim at y=56
const LIQUID_TOP = 56;
const LIQUID_BOTTOM = 150;

export function Ritual() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const liquid = root.querySelector<SVGRectElement>("[data-liquid]");
      const surface = root.querySelector<SVGElement>("[data-surface]");
      const surfaceWrap = root.querySelector<SVGElement>("[data-surface-wrap]");
      const glow = root.querySelector<HTMLElement>("[data-cup-glow]");
      const readout = root.querySelector<HTMLElement>("[data-fill-readout]");
      const steam = root.querySelectorAll<SVGPathElement>("[data-steam]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      if (!liquid) return;

      // The pour, deterministic: each step drives exactly one third of the
      // fill as it scrolls through, so the brim is only reached at "Sip".
      const pour = { p: 0 };
      const applyPour = () => {
        const p = Math.max(0, Math.min(1, pour.p));
        const y = LIQUID_BOTTOM - (LIQUID_BOTTOM - LIQUID_TOP) * p;
        gsap.set(liquid, { attr: { y, height: LIQUID_BOTTOM - y } });
        if (surface) gsap.set(surface, { attr: { cy: y }, autoAlpha: p > 0.02 ? 1 : 0 });
        if (glow) gsap.set(glow, { autoAlpha: p, scale: 0.85 + 0.15 * p });
        if (readout) {
          const pct = Math.round(p * 100);
          readout.textContent =
            pct >= 99 ? "POURED · 100%" : pct <= 0 ? "PRECISION POUR" : `FILLING · ${pct}%`;
        }
      };
      applyPour();
      steps.forEach((step, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 72%",
            end: "bottom 72%",
            scrub: 0.4,
            onUpdate: (self) => {
              // only the furthest-reached step writes, so re-entering an
              // earlier step drains back naturally
              pour.p = (i + self.progress) / steps.length;
              applyPour();
            },
          },
        });
      });

      // Living liquid: a gentle continuous shimmer on the surface while
      // the scrub positions it.
      if (surfaceWrap) {
        gsap.to(surfaceWrap, {
          y: 1.6,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Steam appears only once "Sip" arrives; a standing drift loop keeps
      // it alive (invisible until then, so the loop costs nothing visually).
      gsap.set(steam, { autoAlpha: 0 });
      steam.forEach((path, i) => {
        gsap.to(path, {
          y: -4,
          duration: 1.8 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.25,
        });
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: steps[2],
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        })
        .to(steam, {
          autoAlpha: 0.75,
          stagger: 0.14,
          duration: 0.6,
          ease: "power2.out",
        });

      // Active step accents
      steps.forEach((step) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: step,
              start: "top 62%",
              end: "bottom 45%",
              toggleActions: "play reverse play reverse",
            },
          })
          .to(
            step.querySelector("[data-step-n]"),
            { color: "#cf9553", duration: 0.3 },
            0
          )
          .to(
            step.querySelector("[data-step-rule]"),
            { scaleX: 1, duration: 0.5, ease: "expo.out" },
            0
          );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="w-full bg-neutral-50 text-primary"
      aria-label="How Chocodew vending works"
    >
      <div className="container mx-auto max-w-7xl px-4 py-16 md:py-28">
        <div className="mb-10 max-w-2xl md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl"
          >
            One cup, three moves
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Twenty-five seconds from button to beverage, engineered so the
            ritual never varies.
          </motion.p>
        </div>

        <div className="grid gap-2 md:grid-cols-[1fr_1.15fr] md:gap-24">
          {/* Filling cup: sticky on every breakpoint, always clear of the navbar */}
          <div className="sticky top-[82px] z-20 -mx-4 bg-gradient-to-b from-neutral-50 from-75% to-neutral-50/0 px-4 pb-6 pt-2 md:top-0 md:z-auto md:mx-0 md:flex md:h-screen md:items-center md:bg-none md:p-0">
            <div className="relative mx-auto w-[min(40vw,175px)] md:w-[min(26vw,320px)]">
              {/* warm glow that builds with the pour */}
              <div
                data-cup-glow
                aria-hidden="true"
                className="absolute inset-x-0 top-1/4 mx-auto aspect-square w-3/4 rounded-full opacity-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(207,149,83,0.35) 0%, rgba(207,149,83,0) 70%)",
                }}
              />
              <svg
                viewBox="0 0 240 220"
                className="relative w-full [filter:drop-shadow(0_16px_22px_rgba(73,54,44,0.16))]"
                role="img"
                aria-label="A cup filling with a hot beverage"
              >
                <defs>
                  <linearGradient id="cd-liquid-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e2b578" />
                    <stop offset="100%" stopColor="#b87a3d" />
                  </linearGradient>
                  <clipPath id="cd-ritual-clip">
                    <path d="M62 52 L178 52 C178 52 174 156 152 156 L88 156 C66 156 62 52 62 52 Z" />
                  </clipPath>
                </defs>

                {/* steam */}
                <g
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                >
                  <path data-steam d="M96 40 C90 32 100 26 96 18" className="motion-reduce:opacity-60" />
                  <path data-steam d="M120 36 C114 28 124 22 120 12" className="motion-reduce:opacity-60" />
                  <path data-steam d="M144 40 C138 32 148 26 144 18" className="motion-reduce:opacity-60" />
                </g>

                {/* liquid */}
                <g clipPath="url(#cd-ritual-clip)">
                  <rect
                    data-liquid
                    x="52"
                    y="150"
                    width="136"
                    height="0"
                    fill="url(#cd-liquid-grad)"
                    className="motion-reduce:[height:94px] motion-reduce:[y:56px]"
                  />
                </g>
                <g data-surface-wrap>
                  <ellipse
                    data-surface
                    cx="120"
                    cy="150"
                    rx="57"
                    ry="5"
                    fill="#e9c48d"
                    opacity="0"
                    className="motion-reduce:opacity-100"
                  />
                </g>

                {/* cup */}
                <path d="M62 52 L178 52 C178 52 174 156 152 156 L88 156 C66 156 62 52 62 52 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" />
                <path d="M178 70 C204 70 204 118 172 122" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" />
                <path d="M46 176 L194 176" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M72 192 L168 192" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
              <p
                data-fill-readout
                className="mt-2 text-center text-[0.62rem] tabular-nums tracking-[0.18em] text-muted-foreground md:mt-5 md:text-[0.72rem]"
              >
                PRECISION POUR
              </p>
            </div>
          </div>

          {/* Steps */}
          <div data-steps className="flex flex-col">
            {STEPS.map((s) => (
              <article
                key={s.n}
                data-step
                className="flex min-h-[44vh] flex-col justify-center py-8 md:min-h-[62vh]"
              >
                <p data-step-n className="font-playfair text-[clamp(3rem,7vw,5rem)] leading-none text-primary/20">
                  {s.n}
                </p>
                <span data-step-rule className="mt-4 block h-px w-24 origin-left scale-x-0 bg-accent motion-reduce:scale-x-100" />
                <h3 className="mt-5 font-playfair text-2xl font-bold text-primary md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
