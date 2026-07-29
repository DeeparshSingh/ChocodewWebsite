"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CalculatorIntro() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* warm glow rising from below, like the original */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(60% 90% at 50% 100%, rgba(228,164,96,0.38) 0%, rgba(228,164,96,0.12) 45%, rgba(228,164,96,0) 75%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-xs font-medium uppercase tracking-[0.26em] text-accent md:text-sm"
      >
        Premix Calculator
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="mt-6 max-w-5xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text font-playfair text-5xl font-semibold leading-[1.05] text-transparent drop-shadow-2xl sm:text-7xl md:text-8xl"
      >
        Cups in, kilos out
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
        className="mt-7 max-w-[560px] text-base font-medium text-muted-foreground sm:text-xl"
      >
        Tell us what your workplace drinks and how often, and get your monthly
        premix requirement instantly. No guesswork.
      </motion.p>

      <motion.a
        href="#calculator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
        className="group relative z-10 mt-12 inline-flex items-center justify-center rounded-full border border-foreground/10 bg-background/20 px-8 py-3.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <span className="text-lg font-medium text-primary">Start Calculating</span>
      </motion.a>
    </section>
  );
}
