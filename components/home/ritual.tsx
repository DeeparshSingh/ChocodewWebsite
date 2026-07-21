"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const STEPS = [
  {
    n: "01",
    title: "Choose",
    body: "Cappuccino, cutting chai, cardamom, soup — pick from up to seven beverages on a one-touch panel. No barista, no queue, no guesswork.",
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
const LIQUID = "#cf9553";
const LIQUID_BRIGHT = "#e2b578";

export function Ritual() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const liquid = root.querySelector<SVGRectElement>("[data-liquid]");
      const surface = root.querySelector<SVGElement>("[data-surface]");
      const steam = root.querySelectorAll<SVGPathElement>("[data-steam]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      if (!liquid) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector("[data-steps]"),
          start: "top 62%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
      tl.fromTo(
        liquid,
        { attr: { y: 150, height: 0 } },
        { attr: { y: 56, height: 94 }, ease: "none", duration: 3 },
        0
      );
      if (surface) {
        tl.fromTo(
          surface,
          { attr: { cy: 150 }, autoAlpha: 0 },
          { attr: { cy: 56 }, autoAlpha: 1, ease: "none", duration: 3 },
          0
        );
      }
      tl.fromTo(
        steam,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 0.75, y: 0, stagger: 0.15, duration: 0.5 },
        2.55
      );

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
          .to(step.querySelector("[data-step-n]"), { color: LIQUID, duration: 0.3 }, 0)
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
        <div className="mb-14 max-w-2xl md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl"
          >
            One cup, three moves.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            Twenty-five seconds from button to beverage — engineered so the
            ritual never varies.
          </motion.p>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-24">
          {/* Sticky filling cup */}
          <div className="md:sticky md:top-0 md:flex md:h-screen md:items-center">
            <div className="mx-auto w-[min(64vw,260px)] md:w-[min(26vw,320px)]">
              <svg
                viewBox="0 0 240 220"
                className="w-full"
                role="img"
                aria-label="A cup filling with a hot beverage"
              >
                <g
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                >
                  <path data-steam d="M96 34 C90 26 100 20 96 12" opacity="0" className="motion-reduce:opacity-60" />
                  <path data-steam d="M120 30 C114 22 124 16 120 6" opacity="0" className="motion-reduce:opacity-60" />
                  <path data-steam d="M144 34 C138 26 148 20 144 12" opacity="0" className="motion-reduce:opacity-60" />
                </g>

                <defs>
                  <clipPath id="cd-ritual-clip">
                    <path d="M62 52 L178 52 C178 52 174 156 152 156 L88 156 C66 156 62 52 62 52 Z" />
                  </clipPath>
                </defs>

                <g clipPath="url(#cd-ritual-clip)">
                  <rect
                    data-liquid
                    x="52"
                    y="150"
                    width="136"
                    height="0"
                    fill={LIQUID}
                    className="motion-reduce:[height:94px] motion-reduce:[y:56px]"
                  />
                </g>
                <ellipse
                  data-surface
                  cx="120"
                  cy="150"
                  rx="57"
                  ry="5"
                  fill={LIQUID_BRIGHT}
                  opacity="0"
                  className="motion-reduce:opacity-100"
                />

                <path d="M62 52 L178 52 C178 52 174 156 152 156 L88 156 C66 156 62 52 62 52 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" />
                <path d="M178 70 C204 70 204 118 172 122" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" />
                <path d="M46 176 L194 176" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M72 192 L168 192" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
              <p className="mt-6 text-center text-[0.72rem] tracking-[0.16em] text-muted-foreground">
                PRECISION POUR · FILTERED WATER
              </p>
            </div>
          </div>

          {/* Steps */}
          <div data-steps className="flex flex-col">
            {STEPS.map((s) => (
              <article
                key={s.n}
                data-step
                className="flex min-h-[42vh] flex-col justify-center py-8 md:min-h-[62vh]"
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
