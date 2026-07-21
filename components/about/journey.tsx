"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { milestones } from "@/data/milestones";
import { cn } from "@/lib/utils";

const HOLD = 4500;
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Interactive journey — no long scroll. A large feature panel crossfades
 * between milestones; a horizontal timeline track selects them and
 * auto-advances. Fully responsive.
 */
export function Journey() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const select = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (paused || reduce.current) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % milestones.length),
      HOLD
    );
    return () => clearTimeout(t);
  }, [index, paused]);

  const active = milestones[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Feature panel */}
      <div className="relative min-h-[15rem] md:min-h-[13rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid items-start gap-4 md:grid-cols-[minmax(0,auto)_1fr] md:gap-12"
          >
            <span className="font-playfair text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.9] text-accent">
              {active.year}
            </span>
            <div className="md:pt-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {milestones.length}
              </p>
              <h3 className="mt-2 font-playfair text-2xl font-bold text-primary md:text-3xl">
                {active.title}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                {active.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline track */}
      <div className="mt-10 md:mt-14">
        <div className="relative">
          {/* base line */}
          <div className="absolute left-0 right-0 top-[11px] h-px bg-primary/15" />
          {/* progress line */}
          <div
            className="absolute left-0 top-[11px] h-px bg-accent transition-all duration-500 ease-out"
            style={{
              width: `${(index / (milestones.length - 1)) * 100}%`,
            }}
          />
          <div className="no-scrollbar relative flex justify-between gap-4 overflow-x-auto pb-2">
            {milestones.map((m, i) => {
              const isActive = i === index;
              const isPast = i < index;
              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => select(i)}
                  aria-label={`${m.year} — ${m.title}`}
                  aria-current={isActive}
                  className="group flex shrink-0 flex-col items-center gap-3"
                >
                  <span
                    className={cn(
                      "h-[22px] w-[22px] rounded-full border-2 bg-background transition-all duration-300",
                      isActive
                        ? "scale-110 border-accent bg-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.18)]"
                        : isPast
                          ? "border-accent"
                          : "border-primary/25 group-hover:border-accent/70"
                    )}
                  />
                  <span
                    className={cn(
                      "font-playfair text-sm font-semibold transition-colors duration-300 md:text-base",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                    )}
                  >
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
