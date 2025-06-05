"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductCarousel() {
  const featuredProducts = products.filter(product => product.featured);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    console.log("ProductCarousel: scrollPrev triggered. Current api:", api ? "defined" : "undefined");
    if (api) {
      console.log("ProductCarousel: api.canScrollPrev() returns:", api.canScrollPrev());
      console.log("ProductCarousel: api.scrollPrev is type:", typeof api.scrollPrev);
    }
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    console.log("ProductCarousel: scrollNext triggered. Current api:", api ? "defined" : "undefined");
    if (api) {
      console.log("ProductCarousel: api.canScrollNext() returns:", api.canScrollNext());
      console.log("ProductCarousel: api.scrollNext is type:", typeof api.scrollNext);
    }
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const checkScrollability = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    checkScrollability();
    api.on("select", checkScrollability);
    api.on("reInit", checkScrollability);
    return () => {
      api.off("select", checkScrollability);
      api.off("reInit", checkScrollability);
    };
  }, [api]);

  if (!featuredProducts.length) return null;

  return (
    <div className="w-full">
      {/* Desktop Layout: Buttons flanking the Carousel */}
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <Carousel 
          setApi={setApi} 
          opts={{ align: "start", loop: false }} 
          className="flex-1 overflow-hidden" // Carousel takes up space between buttons
        >
          <CarouselContent className="-ml-1 py-2">
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-1 md:basis-1/2 lg:basis-1/3 p-3">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Layout: Carousel above the buttons */}
      <div className="md:hidden">
        <Carousel 
          setApi={setApi} // This will be called if mobile view renders first, or if desktop is not rendered.
          opts={{ align: "start", loop: false }} 
          className="w-full"
        >
          <CarouselContent className="-ml-1 py-2">
            {featuredProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-1 basis-full p-3">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="flex justify-center space-x-2 mt-6">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-9 w-9"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-9 w-9"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}