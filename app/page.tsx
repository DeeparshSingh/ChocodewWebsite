import { Button } from "@/components/ui/button";
import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { ProductCarousel } from "@/components/home/product-carousel";
import { TestimonialStrip } from "@/components/home/testimonial-strip";
import { CtaBanner } from "@/components/home/cta-banner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <ValueProps />
      
      <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">Our Premium Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our range of high-quality vending machines and premium beverage mixes,
            designed to deliver exceptional taste and convenience.
          </p>
        </div>
        <ProductCarousel />
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>
      
      <TestimonialStrip />
      <CtaBanner />
    </div>
  );
}