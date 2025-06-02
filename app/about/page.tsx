import { Timeline } from "@/components/about/timeline";
import { FounderBio } from "@/components/about/founder-bio";
import { FactsGrid } from "@/components/about/facts-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chocodew",
  description: "Learn about Chocodew's journey, mission, and values. Established in 2007, we're an ISO 9001:2015 certified leader in beverage vending solutions.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">About Chocodew</h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Since 2007, Chocodew has been a pioneer in beverage vending solutions, 
            committed to quality, innovation, and exceptional customer service.
          </p>
        </div>

        <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
          <section className="bg-neutral-50/50 py-8 md:py-12 -mx-4 px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-3xl font-bold">Our Journey</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                From our humble beginnings to becoming an industry leader, follow our growth story over the years.
              </p>
            </div>
            <Timeline />
          </section>

          <FounderBio />
          
          <section className="bg-neutral-50/50 py-8 md:py-12 -mx-4 px-4">
            <FactsGrid />
          </section>
        </div>
      </div>
    </div>
  );
}