"use client";

import { motion } from "framer-motion";
import { Coffee, Award, Truck, HeartHandshake } from "lucide-react";
import { Nums } from "@/components/fx/nums";

const valueProps = [
  {
    icon: Coffee,
    title: "Exceptional Quality",
    description: "Every ingredient vetted, every cup consistent.",
  },
  {
    icon: Award,
    title: "ISO 9001:2015 Certified",
    description: "Globally recognised standards. Locally perfected.",
  },
  {
    icon: Truck,
    title: "Uninterrupted Performance",
    description: "Installation, maintenance, supplies. Handled, hassle-free.",
  },
  {
    icon: HeartHandshake,
    title: "Seamless Experience",
    description: "Effortless setup. Smooth operation. Pure satisfaction.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ValueProps() {
  return (
    <section className="w-full bg-neutral-50 py-16 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Editorial header: statement left, context right */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="col-span-full font-playfair text-3xl font-bold leading-[1.05] text-primary md:col-span-7 md:text-5xl lg:text-6xl"
          >
            Why teams stay
            <br className="hidden sm:block" /> with{" "}
            <span className="italic text-accent">Chocodew</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="col-span-full max-w-sm text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-base"
          >
            A partner obsessed with the details that make the difference, from
            the first install to the ten-thousandth cup.
          </motion.p>
        </div>

        {/* Four props — hairline-separated, no cards, no shadows */}
        <div className="mt-14 grid grid-cols-2 border-t border-primary/10 md:mt-20 md:grid-cols-4">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                className={[
                  "group relative border-b border-primary/10 px-1 py-8 md:py-12",
                  // vertical hairlines between columns
                  "md:border-r md:border-primary/10 md:px-7",
                  index % 2 === 0 ? "border-r border-primary/10 pr-5" : "pl-5 md:pl-7",
                  index === 3 ? "md:border-r-0" : "",
                ].join(" ")}
              >
                <span className="cd-num text-5xl font-semibold leading-none text-accent/70 transition-colors duration-500 group-hover:text-accent md:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Icon
                  className="mt-6 h-6 w-6 text-accent transition-transform duration-500 group-hover:-translate-y-1 md:h-7 md:w-7"
                  strokeWidth={1.5}
                />

                <h3 className="mt-4 font-playfair text-base font-semibold leading-snug text-primary md:text-xl">
                  <Nums>{prop.title}</Nums>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {prop.description}
                </p>

                {/* caramel underline sweep */}
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
