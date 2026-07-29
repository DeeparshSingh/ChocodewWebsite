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
      className="cd-grain relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-[#211712]"
      aria-label="Chocodew premium beverage vending"
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
        className="container mx-auto max-w-7xl px-4 pb-[clamp(3rem,8vh,5rem)] pt-32 relative z-10"
      >
        <motion.div
          className="mb-7 flex items-center gap-4"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          <span aria-hidden="true" className="h-px w-12 bg-[#d99e5e]" />
          <span className="text-[0.72rem] font-medium tracking-[0.3em] text-[#c4b09a]">
            BEVERAGE VENDING, PERFECTED
          </span>
        </motion.div>

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

        <motion.div
          className="mt-8 max-w-xl"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.55 }}
        >
          <p className="text-[#c4b09a] text-lg md:text-xl leading-relaxed">
            Vending machines and premixes engineered for delight. Coffee,
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

        {/* Bottom stat strip */}
        <motion.dl
          className="mt-12 grid grid-cols-3 gap-4 border-t border-[#f1e8da]/15 pt-6 md:mt-14 md:gap-8 md:pt-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
        >
          {[
            { value: "2007", label: "BREWING SINCE" },
            { value: "2,000+", label: "INSTALLATIONS" },
            { value: "ISO 9001", valueLg: "ISO 9001:2015", label: "CERTIFIED QUALITY" },
          ].map((stat) => (
            <div key={stat.label}>
              <dd className="font-playfair text-lg font-bold text-[#f1e8da] sm:text-xl md:text-3xl">
                {stat.valueLg ? (
                  <>
                    <span className="md:hidden">{stat.value}</span>
                    <span className="hidden md:inline">{stat.valueLg}</span>
                  </>
                ) : (
                  stat.value
                )}
              </dd>
              <dt className="mt-1 text-[0.6rem] tracking-[0.22em] text-[#c4b09a]/80 md:text-[0.72rem]">
                {stat.label}
              </dt>
            </div>
          ))}
        </motion.dl>
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
