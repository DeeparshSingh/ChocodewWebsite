"use client";

import { motion } from "framer-motion";
import { testimonials as data } from "@/data/testimonials";
import {
  TestimonialsColumn,
  type Testimonial,
} from "@/components/ui/testimonials-columns-1";

const items: Testimonial[] = data.map((t) => ({
  text: t.text,
  name: t.name,
  role: t.role ? `${t.role}, ${t.company}` : t.company,
}));

const firstColumn = items.slice(0, 3);
const secondColumn = items.slice(3, 5);
const thirdColumn = items.slice(5, 7);

const EASE = [0.16, 1, 0.3, 1] as const;

export function Testimonials() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[560px] flex-col items-center text-center"
        >
          <div className="rounded-full border border-primary/15 px-4 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            Testimonials
          </div>
          <h2 className="mt-5 font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl">
            Poured, sipped, <span className="italic text-accent">approved</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Offices, hotels, hospitals and campuses across India on what it&rsquo;s
            like to run on Chocodew.
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[640px] overflow-hidden md:mt-16">
          <TestimonialsColumn testimonials={firstColumn} duration={17} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={22}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={19}
          />
        </div>
      </div>
    </section>
  );
}
