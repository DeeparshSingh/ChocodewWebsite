"use client";

import * as React from "react";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Assuming this is the correct path for shadcn carousel components

export function ProductCarousel() {
  const featuredProducts = products.filter(product => product.featured);

  if (!featuredProducts.length) {
    return null; // Or some placeholder if no featured products
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full relative"
    >
      <CarouselContent className="-ml-1 py-4"> {/* py-4 for some vertical spacing if cards have shadows/borders */} 
        {featuredProducts.map((product) => (
          <CarouselItem key={product.id} className="pl-1 basis-full md:basis-1/2 lg:basis-1/3 p-3"> {/* p-3 from your original item styling */} 
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background text-foreground shadow-md transition-all" />
      <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-background/80 hover:bg-background text-foreground shadow-md transition-all" /> 
      
      {/* Mobile navigation can be implicitly handled by swipe, or you can style CarouselPrevious/Next to be visible on mobile if desired */}
      {/* For example, to show them on mobile but positioned differently: */}
      {/* <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 md:hidden" /> */}
      {/* <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 md:hidden" /> */}
    </Carousel>
  );
}