"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/fx/count-up";

type Fact = {
  label: string;
  /** rendered when numeric */
  value?: number;
  prefix?: string;
  suffix?: string;
  /** rendered when non-numeric */
  text?: string;
  note: string;
};

const FACTS: Fact[] = [
  { value: 2000, suffix: "+", label: "Installations", note: "Cups poured daily, nationwide" },
  { value: 15, suffix: " states", label: "Service network", note: "Install, supply & maintenance" },
  { text: "Since 2007", label: "Experience", note: "Family-run, still" },
  { value: 50, suffix: "+", label: "People", note: "Blending to service" },
  { text: "ISO 9001:2015", label: "Certified", note: "Quality, independently assured" },
  { text: "Ludhiana", label: "Headquarters", note: "Punjab, India" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Facts() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-12 max-w-2xl md:mb-16"
      >
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">
          By the numbers
        </p>
        <h2 className="mt-4 font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl">
          Small operation, <span className="italic text-accent">long reach</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 border-l border-t border-primary/10 md:grid-cols-3">
        {FACTS.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
            className="group flex flex-col gap-2 border-b border-r border-primary/10 p-4 transition-colors duration-500 hover:bg-neutral-50 sm:p-5 md:p-8"
          >
            <span className="break-words font-playfair text-[clamp(1.7rem,6.5vw,3.75rem)] font-bold leading-[1.05] text-primary">
              {typeof fact.value === "number" ? (
                <CountUp to={fact.value} prefix={fact.prefix} suffix={fact.suffix} />
              ) : (
                fact.text
              )}
            </span>
            <span className="mt-1 text-sm font-semibold text-primary md:text-base">
              {fact.label}
            </span>
            <span className="text-xs text-muted-foreground md:text-sm">
              {fact.note}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
