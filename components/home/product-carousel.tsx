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
import { useMediaQuery } from "@/hooks/use-media-query"; // Import the hook

export function ProductCarousel() {
  const featuredProducts = products.filter(product => product.featured);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // State to prevent hydration mismatch for useMediaQuery
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Tailwind's md breakpoint is 768px
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const scrollPrev = useCallback(() => {
    console.log("ProductCarousel: scrollPrev triggered. Current api:", api ? "defined" : "undefined", "isDesktop:", isDesktop);
    if (api) {
      console.log("ProductCarousel: api.canScrollPrev() returns:", api.canScrollPrev());
      console.log("ProductCarousel: api.scrollPrev is type:", typeof api.scrollPrev);
    }
    api?.scrollPrev();
  }, [api, isDesktop]); // Added isDesktop to dependencies for logging clarity

  const scrollNext = useCallback(() => {
    console.log("ProductCarousel: scrollNext triggered. Current api:", api ? "defined" : "undefined", "isDesktop:", isDesktop);
    if (api) {
      console.log("ProductCarousel: api.canScrollNext() returns:", api.canScrollNext());
      console.log("ProductCarousel: api.scrollNext is type:", typeof api.scrollNext);
    }
    api?.scrollNext();
  }, [api, isDesktop]); // Added isDesktop to dependencies for logging clarity

  useEffect(() => {
    if (!api) return;
    // Reset scrollability when api changes (e.g. on layout switch)
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    const checkScrollability = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    
    api.on("select", checkScrollability);
    api.on("reInit", checkScrollability);
    return () => {
      api.off("select", checkScrollability);
      api.off("reInit", checkScrollability);
    };
  }, [api]); // api is the sole dependency here, as it's what we're subscribing to

  if (!featuredProducts.length) return null;

  // Wait until mounted to ensure useMediaQuery works correctly on client
  // and to prevent hydration mismatch between server and client render.
  if (!isMounted) {
    // Render nothing or a placeholder on the server and during initial client mount.
    // This ensures that the useMediaQuery hook has a chance to run on the client
    // before we attempt to render a responsive layout.
    return null; 
  }

  if (isDesktop) {
    return (
      // Desktop Layout: Buttons flanking the Carousel
      <div className="w-full flex items-center space-x-4">
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
          setApi={setApi} // This setApi will be called for the desktop carousel
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
    );
  } else {
    // Mobile Layout: Carousel above the buttons
    return (
      <div className="w-full">
        <Carousel 
          setApi={setApi} // This setApi will be called for the mobile carousel
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
    );
  }
}