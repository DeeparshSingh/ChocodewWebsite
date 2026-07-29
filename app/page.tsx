import { Button } from "@/components/ui/button";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { ProductCarousel } from "@/components/home/product-carousel";
import { Ritual } from "@/components/home/ritual";
import { Testimonials } from "@/components/home/testimonials";
import { Trusted } from "@/components/home/trusted";
import { CtaBanner } from "@/components/home/cta-banner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <Hero />
      <ValueProps />

      {/* Product range */}
      <section className="w-full bg-white py-16 md:py-28">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                The Range
              </p>
              <h2 className="mt-4 font-playfair text-3xl font-bold leading-[1.05] text-primary md:text-5xl">
                Crafted for <span className="italic text-accent">every cup</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Vending machines, drink premixes and water dispensers, built to
              deliver exceptional taste and effortless reliability, day after day.
            </p>
          </div>

          <ProductCarousel />

          <div className="mt-12 flex justify-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group rounded-full"
            >
              <Link href="/products" className="flex items-center gap-2">
                View all products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Ritual />
      <Testimonials />
      <Trusted />
      <CtaBanner />
    </div>
  );
}
