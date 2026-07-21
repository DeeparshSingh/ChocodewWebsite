"use client";

import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CalculatorIntro() {
  return (
    <section className="relative flex flex-col items-center px-4 pb-14 pt-32 text-center md:pb-20 md:pt-44">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-xs font-medium uppercase tracking-[0.24em] text-accent md:text-sm"
      >
        Premix Calculator
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        className="mt-5 max-w-3xl font-playfair text-4xl font-bold leading-[1.05] text-primary md:text-6xl lg:text-7xl"
      >
        Cups in. <span className="italic text-accent">Kilos out.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
        className="mt-6 max-w-xl text-sm text-muted-foreground md:text-lg"
      >
        Tell us what your workplace drinks and how often — get your monthly
        premix requirement instantly, no guesswork.
      </motion.p>

      <motion.a
        href="#calculator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
        className="group mt-10 flex flex-col items-center focus:outline-none"
      >
        <span className="inline-flex items-center rounded-full border border-primary/10 bg-background/60 px-7 py-3.5 text-base font-medium text-primary shadow-lg backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
          Start Calculating
        </span>
        <ChevronsDown className="mt-4 h-7 w-7 animate-bounce text-accent" />
      </motion.a>
    </section>
  );
}
