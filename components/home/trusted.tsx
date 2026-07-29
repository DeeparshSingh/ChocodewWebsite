"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Building2,
  Hotel,
  GraduationCap,
  Store,
  Factory,
  Landmark,
  Coffee,
  Briefcase,
  Stethoscope,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const SECTORS = [
  { icon: Building2, label: "Corporate Offices" },
  { icon: Stethoscope, label: "Hospitals" },
  { icon: Hotel, label: "Hotels & Resorts" },
  { icon: GraduationCap, label: "Universities" },
  { icon: Store, label: "Showrooms" },
  { icon: Factory, label: "Factories" },
  { icon: Landmark, label: "Banks" },
  { icon: Coffee, label: "Cafés & QSRs" },
  { icon: Briefcase, label: "Co-working" },
  { icon: Users, label: "Institutions" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Trusted() {
  return (
    <section className="w-full overflow-hidden bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            2,000+ installations · 15 states
          </p>
          <h2 className="mt-4 max-w-2xl font-playfair text-3xl font-bold leading-[1.08] text-primary md:text-4xl">
            Brewing in every kind of workplace
          </h2>
        </motion.div>
      </div>

      <div className="relative mt-12 md:mt-16">
        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[AutoScroll({ playOnInit: true, speed: 0.7, stopOnInteraction: false })]}
        >
          <CarouselContent className="ml-0">
            {[...SECTORS, ...SECTORS].map((sector, i) => {
              const Icon = sector.icon;
              return (
                <CarouselItem
                  key={i}
                  className="flex basis-[31%] justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-2 flex shrink-0 flex-col items-center gap-2.5 md:mx-8 md:gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/10 bg-card text-accent shadow-sm md:h-16 md:w-16">
                      <Icon className="h-5 w-5 md:h-7 md:w-7" strokeWidth={1.5} />
                    </span>
                    <span className="whitespace-nowrap text-[11px] font-medium text-muted-foreground md:text-sm">
                      {sector.label}
                    </span>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-neutral-50 to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-50 to-transparent md:w-28" />
      </div>
    </section>
  );
}
