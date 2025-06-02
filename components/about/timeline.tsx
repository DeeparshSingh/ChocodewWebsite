"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { milestones } from "@/data/milestones";
import { useRef } from "react";

export function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6" ref={timelineRef}>
      <motion.div 
        style={{ scaleY }}
        className="absolute left-4 sm:left-8 top-0 w-[2px] h-full origin-top bg-gradient-to-b from-primary via-primary to-primary/50"
      />

      <div className="space-y-12 sm:space-y-16 relative">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.year}
            className="relative pl-10 sm:pl-16"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="absolute left-[11px] sm:left-[25px] top-4 z-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="w-4 h-4 rounded-full bg-primary border-3 border-background shadow-md relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              </div>
            </motion.div>

            <motion.div
              className="absolute left-[14px] sm:left-[28px] top-6 w-6 sm:w-8 h-[2px] bg-primary/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />

            <motion.div
              className="bg-card backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-border/50 shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              <div className="inline-flex items-center justify-center mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full blur-[2px] opacity-50" />
                  <div className="relative bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-1 rounded-full text-xs font-medium shadow-sm backdrop-blur-sm">
                    {milestone.year}
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                {milestone.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {milestone.description}
              </p>

              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-primary/5 to-transparent rounded-bl-xl pointer-events-none" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}