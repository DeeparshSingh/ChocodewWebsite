import { Journey } from "@/components/about/journey";
import { FounderBio } from "@/components/about/founder-bio";
import { Facts } from "@/components/about/facts";
import { Hero } from "@/components/blocks/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chocodew",
  description:
    "Learn about Chocodew's journey, mission, and values. Established in 2007, we're an ISO 9001:2015 certified leader in beverage vending solutions.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <Hero
        className="rounded-none min-h-[100svh]"
        topPaddingClass="pt-24 md:pt-28"
        title="Brewed with Passion. Built on Trust"
        subtitle="Since 2007, Chocodew has been a pioneer in beverage vending solutions, committed to quality, innovation, and exceptional customer service."
        titleClassName="font-playfair text-[#49362c]"
        subtitleClassName="max-w-3xl"
        innerGapClass="gap-1 md:gap-2"
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="space-y-20 md:space-y-32">
          {/* Journey */}
          <section aria-label="Our journey">
            <div className="mb-10 max-w-2xl md:mb-14">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">
                Our journey
              </p>
              <h2 className="mt-4 font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl">
                Seventeen years, <span className="italic text-accent">one cup at a time</span>
              </h2>
            </div>
            <Journey />
          </section>

          <FounderBio />

          {/* Facts */}
          <section aria-label="Chocodew by the numbers">
            <Facts />
          </section>
        </div>
      </div>
    </div>
  );
}
