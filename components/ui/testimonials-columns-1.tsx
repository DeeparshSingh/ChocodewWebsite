"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  /** optional photo; when absent an initials monogram is shown */
  image?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="w-full max-w-xs rounded-3xl border border-primary/10 bg-card p-8 shadow-lg shadow-primary/5"
                  key={i}
                >
                  <p className="text-sm leading-relaxed text-foreground/90">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        width={44}
                        height={44}
                        src={image}
                        alt={name}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 font-playfair text-sm font-semibold text-primary"
                      >
                        {initials(name)}
                      </span>
                    )}
                    <div className="flex flex-col">
                      <div className="font-medium leading-5 tracking-tight text-primary">
                        {name}
                      </div>
                      <div className="text-xs leading-5 tracking-tight text-muted-foreground">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
