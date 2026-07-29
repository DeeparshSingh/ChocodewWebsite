"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/fx/count-up";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Cell {
  label: string;
  note: string;
  value?: number;
  suffix?: string;
  text?: string;
  /** grid span + emphasis */
  className: string;
  big?: boolean;
}

const CELLS: Cell[] = [
  {
    value: 2000,
    suffix: "+",
    label: "Installations",
    note: "Cups poured daily, nationwide",
    className: "col-span-2 md:col-span-5",
    big: true,
  },
  {
    value: 15,
    label: "States served",
    note: "Install, supply & maintenance",
    className: "md:col-span-3",
  },
  {
    text: "2007",
    label: "Brewing since",
    note: "Family-run, still",
    className: "md:col-span-4",
  },
  {
    value: 50,
    suffix: "+",
    label: "People",
    note: "Blending to service",
    className: "md:col-span-3",
  },
  {
    text: "ISO 9001:2015",
    label: "Certified",
    note: "Quality, independently assured",
    className: "md:col-span-5",
  },
  {
    text: "Ludhiana",
    label: "Headquarters",
    note: "Punjab, India",
    className: "md:col-span-4",
  },
];

export function Facts() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-10 max-w-2xl md:mb-14"
      >
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">
          By the numbers
        </p>
        <h2 className="mt-4 font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl">
          Small operation, <span className="italic text-accent">long reach</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* warm glow inside the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(70% 55% at 82% 0%, rgba(217,158,94,0.16) 0%, transparent 60%)",
          }}
        />

        {/* mosaic: hairline seams via gap over a lighter base */}
        <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-12">
          {CELLS.map((cell, i) => (
            <motion.div
              key={cell.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
              className={`group flex flex-col justify-end bg-gradient-to-br from-[#241812] to-[#33210f] p-5 transition-colors duration-500 hover:from-[#2a1c14] hover:to-[#3a2717] md:p-8 ${cell.className}`}
            >
              <span
                className={
                  cell.big
                    ? "break-words font-playfair text-[clamp(3.2rem,10vw,6rem)] font-bold leading-none text-[#d99e5e]"
                    : "break-words font-playfair text-[clamp(1.7rem,5.5vw,2.9rem)] font-bold leading-[1.05] text-[#f1e8da]"
                }
              >
                {typeof cell.value === "number" ? (
                  <CountUp to={cell.value} suffix={cell.suffix} />
                ) : (
                  cell.text
                )}
              </span>
              <span className="mt-3 text-sm font-semibold text-[#f1e8da]/90 md:text-base">
                {cell.label}
              </span>
              <span className="mt-1 text-xs text-[#c4b09a] md:text-sm">
                {cell.note}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
