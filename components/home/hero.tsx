"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BeanFieldLazy } from "@/components/fx/bean-field-lazy";
import { Steam } from "@/components/fx/steam";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const WORDS = [
  { text: "Sip.", accent: false },
  { text: "Smile.", accent: true },
  { text: "Repeat.", accent: false },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      gsap.to(section.querySelector("[data-hero-content]"), {
        yPercent: -14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom 30%",
          scrub: 0.6,
        },
      });
      gsap.to(section.querySelector("[data-hero-scene]"), {
        autoAlpha: 0.14,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#211712]"
      aria-label="Chocodew — premium beverage vending"
    >
      {/* 3D bean field + warm vignette */}
      <div data-hero-scene className="absolute inset-0">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 85% at 72% 18%, rgba(120,78,42,0.5) 0%, transparent 55%), radial-gradient(90% 60% at 18% 88%, rgba(93,62,36,0.45) 0%, transparent 60%)",
          }}
        />
        <BeanFieldLazy className="absolute inset-0 h-full w-full" count={26} />
        <Steam intensity={0.55} originX={0.74} spread={0.1} />
      </div>

      <div
        data-hero-content
        className="container mx-auto max-w-7xl px-4 pb-[clamp(5rem,16vh,9rem)] pt-36 relative z-10"
      >
        <h1 className="font-playfair font-bold leading-[0.98] tracking-tight text-[clamp(3.4rem,2rem+9vw,9rem)]">
          {WORDS.map((w, i) => (
            <span
              key={w.text}
              className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top last:mr-0"
            >
              <motion.span
                className={
                  "inline-block " + (w.accent ? "text-[#d99e5e]" : "text-[#f1e8da]")
                }
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.11 }}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-9 md:flex-row md:items-end">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            <p className="text-[#c4b09a] text-lg md:text-xl leading-relaxed">
              Vending machines and premixes engineered for delight — coffee,
              chai and more, brewed identically perfect, cup after cup.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-[#d99e5e] px-8 py-3.5 text-[0.95rem] font-medium text-[#211712] transition-colors duration-300 hover:bg-[#e6b578]"
              >
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-[#f1e8da]/30 px-8 py-3.5 text-[0.95rem] font-medium text-[#f1e8da] transition-colors duration-300 hover:border-[#f1e8da]/70"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex shrink-0 items-center gap-8 md:flex-col md:items-end md:gap-3"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          >
            <p className="text-[0.8rem] tracking-[0.14em] text-[#c4b09a]">
              SINCE 2007 · LUDHIANA
            </p>
            <p className="text-[0.8rem] tracking-[0.14em] text-[#c4b09a]">
              ISO 9001:2015 CERTIFIED
            </p>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 pb-4 md:flex"
      >
        <span className="relative block h-12 w-px overflow-hidden bg-[#f1e8da]/15">
          <span className="absolute left-0 top-0 h-4 w-px animate-[cd-cue_2.4s_ease-in-out_infinite] bg-[#d99e5e]" />
        </span>
      </div>
    </section>
  );
}
