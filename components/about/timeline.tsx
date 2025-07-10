"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { milestones } from "@/data/milestones";
import { useRef } from "react";

export function Timeline() {
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
    <section
      ref={ref}
      className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Central timeline accent for desktop */}
      <motion.span
        style={{ scaleY: lineScale }}
        className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px h-full origin-top bg-gradient-to-b from-primary via-primary/70 to-primary/20"
      />

      <ul className="space-y-12 relative">
        {milestones.map((m, idx) => {
          const alignRight = idx % 2 !== 0;
          return (
            <li
              key={m.year}
              className="relative md:grid md:grid-cols-2 md:gap-8 items-start"
            >
              {/* Left column (card when alignLeft) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:col-span-1"
              >
                {!alignRight && <TimelineCard milestone={m} align="left" />}
              </motion.div>

              {/* Center dot (absolute) */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="md:hidden absolute left-4 top-0 h-full w-px bg-border" />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative flex items-center justify-center w-6 h-6"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-md" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:col-span-1"
              >
                {alignRight && <TimelineCard milestone={m} align="right" />}
              </motion.div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

interface TimelineCardProps {
  milestone: {
    year: number;
    title: string;
    description: string;
  };
  align: "left" | "right";
}

function TimelineCard({ milestone, align }: TimelineCardProps) {
  return (
    <div
      className={`relative bg-card rounded-xl border border-border/50 shadow-md hover:shadow-lg transition-shadow duration-300 p-5 sm:p-6 ${
        align === "right" ? "md:ml-4" : "md:mr-4"
      }`}
    >
      {/* Year badge */}
      <div className="inline-flex items-center mb-3">
        <span className="relative text-xs font-semibold px-4 py-1 rounded-full text-primary-foreground bg-gradient-to-r from-primary to-primary/80 shadow-sm">
          {milestone.year}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
        {milestone.title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {milestone.description}
      </p>

      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-primary/5 to-transparent rounded-bl-xl pointer-events-none" />
    </div>
  );
}