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
 * Desktop keeps the alternating centre-line timeline. Mobile drops the rail
 * gutter so cards run the full width, linked by a short vertical connector.
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
      {/* drawing centre line, desktop only */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: lineScale }}
        className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent via-accent/60 to-accent/15 md:block"
      />

      <ul className="relative md:space-y-14">
        {milestones.map((m, idx) => {
          const onRight = idx % 2 !== 0;
          return (
            <li
              key={m.year}
              className="relative md:grid md:grid-cols-2 md:items-center md:gap-14"
            >
              {/* mobile connector between cards */}
              {idx > 0 && (
                <div
                  aria-hidden="true"
                  className="flex flex-col items-center gap-2 py-5 md:hidden"
                >
                  <span className="h-7 w-px bg-gradient-to-b from-accent/10 to-accent/50" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="h-7 w-px bg-gradient-to-b from-accent/50 to-accent/10" />
                </div>
              )}

              {/* centre marker, desktop only */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
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
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#241812] to-[#3a2417] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25 md:p-8">
      {/* year, sitting back as a ghost in the corner */}
      <span
        aria-hidden="true"
        className="cd-num pointer-events-none absolute right-5 top-3 select-none text-[3.25rem] font-bold leading-none text-white/[0.10] transition-colors duration-500 group-hover:text-white/[0.16] md:right-7 md:top-5 md:text-[4.25rem]"
      >
        {milestone.year}
      </span>

      <h3 className="relative pr-24 font-playfair text-xl font-bold text-[#f1e8da] md:pr-32 md:text-2xl">
        {milestone.title}
      </h3>
      <p className="relative mt-2.5 max-w-prose text-sm leading-relaxed text-[#c4b09a]">
        {milestone.description}
      </p>
    </div>
  );
}
