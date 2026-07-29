"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { milestones } from "@/data/milestones";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Milestone {
  year: number;
  title: string;
  description: string;
}

/**
 * The original alternating timeline, elevated: a caramel line that draws
 * with scroll, glowing markers, and rich espresso milestone cards.
 */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl py-2">
      {/* drawing line: centre on desktop, left rail on mobile */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: lineScale }}
        className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-accent/15 md:left-1/2 md:block md:-translate-x-1/2"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: lineScale }}
        className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-accent/15 md:hidden"
      />

      <ul className="relative space-y-10 md:space-y-14">
        {milestones.map((m, idx) => {
          const onRight = idx % 2 !== 0;
          return (
            <li
              key={m.year}
              className="relative pl-12 md:grid md:grid-cols-2 md:items-center md:gap-14 md:pl-0"
            >
              {/* marker */}
              <div className="pointer-events-none absolute left-4 top-10 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/25 [animation-duration:2.6s]" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-neutral-50" />
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className={cn(onRight ? "md:col-start-2" : "md:col-start-1")}
              >
                <TimelineCard milestone={m} />
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TimelineCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241812] to-[#3a2417] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25 md:p-8">
      {/* ghost year watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-5 select-none font-playfair text-[5.5rem] font-bold leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.11] md:text-[6.5rem]"
      >
        {milestone.year}
      </span>

      <span aria-hidden="true" className="block h-px w-9 bg-[#d99e5e]" />
      <p className="mt-4 font-playfair text-lg font-bold italic text-[#d99e5e]">
        {milestone.year}
      </p>
      <h3 className="mt-1.5 font-playfair text-xl font-bold text-[#f1e8da] md:text-2xl">
        {milestone.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[#c4b09a]">
        {milestone.description}
      </p>
    </div>
  );
}
