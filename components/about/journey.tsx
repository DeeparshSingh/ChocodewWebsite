"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { milestones } from "@/data/milestones";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The journey as a strip of rich espresso milestone cards: swipe on touch,
 * arrows or drag on desktop, snap alignment, caramel progress underneath.
 * Compact on every viewport, no long scrolling.
 */
export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = card ? card.getBoundingClientRect().width + 20 : 420;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div>
      {/* Card strip */}
      <div
        ref={trackRef}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scroll-padding-inline:1rem] md:mx-0 md:px-0 md:[scroll-padding-inline:0]"
        role="list"
        aria-label="Company milestones"
      >
        {milestones.map((m, i) => (
          <motion.article
            key={m.year}
            role="listitem"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: Math.min(i, 3) * 0.07,
              ease: EASE,
            }}
            className="group relative flex w-[82vw] max-w-[400px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-[#241812] to-[#3a2417] p-7 pt-24 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/25 md:w-[420px] md:p-9 md:pt-28"
          >
            {/* ghost year */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-5 select-none font-playfair text-[6.5rem] font-bold leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-white/[0.11] md:text-[8rem]"
            >
              {m.year}
            </span>

            {/* caramel accent rule */}
            <span
              aria-hidden="true"
              className="absolute left-7 top-9 h-px w-10 bg-[#d99e5e] md:left-9"
            />

            <p className="text-[0.7rem] font-medium tracking-[0.22em] text-[#c4b09a]">
              {String(i + 1).padStart(2, "0")} / {milestones.length} ·{" "}
              <span className="text-[#d99e5e]">{m.year}</span>
            </p>
            <h3 className="mt-3 font-playfair text-2xl font-bold text-[#f1e8da] md:text-[1.7rem]">
              {m.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#c4b09a]">
              {m.description}
            </p>
          </motion.article>
        ))}
      </div>

      {/* Controls + progress */}
      <div className="mt-7 flex items-center gap-6">
        <div className="flex gap-2.5">
          <button
            type="button"
            aria-label="Previous milestone"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
              canPrev
                ? "border-primary/25 text-primary hover:border-accent hover:bg-accent hover:text-white"
                : "border-primary/10 text-primary/25"
            )}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next milestone"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
              canNext
                ? "border-primary/25 text-primary hover:border-accent hover:bg-accent hover:text-white"
                : "border-primary/10 text-primary/25"
            )}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="relative h-px flex-1 overflow-hidden bg-primary/15">
          <div
            className="absolute inset-y-0 left-0 w-full origin-left bg-accent transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${Math.max(0.06, progress)})` }}
          />
        </div>

        <p className="hidden shrink-0 font-playfair text-sm font-semibold text-primary sm:block">
          2007 – 2024
        </p>
      </div>
    </div>
  );
}
