"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

// Infer the options type directly from the hook
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps {
  images: string[];
  altText: string;
  options?: CarouselOptions;
  onMainImageClick?: () => void;
}

export function ProductImageCarousel({ images, altText, options, onMainImageClick }: ProductImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full object-cover aspect-square bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No image available</p>
      </div>
    );
  }

  return (
    <div className="w-full"> {/* Overall container for the entire component */}
      {/* Main Carousel with Arrows */}
      <div className="relative bg-muted rounded-lg group overflow-hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div
                className="flex-[0_0_100%] min-w-0 relative aspect-square cursor-zoom-in"
                key={`main-${index}`}
                onClick={() => index === selectedIndex && onMainImageClick?.()}
              >
                <Image
                  src={src}
                  alt={`${altText} - image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0} // Prioritize loading the first image
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows for Main Carousel */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous image"
              className={cn(
                "absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-background/50 rounded-full text-foreground opacity-50 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/75 disabled:opacity-30 disabled:cursor-not-allowed",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next image"
              className={cn(
                "absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-background/50 rounded-full text-foreground opacity-50 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/75 disabled:opacity-30 disabled:cursor-not-allowed",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip - Centered */}
      {images.length > 0 && (
        <div className="mt-3 flex justify-center"> {/* Centering wrapper for thumbnails */}
          <div className="flex gap-2 py-1 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-muted/50 max-w-full">
            {images.map((src, index) => (
              <button
                key={`thumb-${index}`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to image ${index + 1}`}
                className={cn(
                  'flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  selectedIndex === index ? 'border-primary opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                )}
              >
                <Image
                  src={src}
                  alt={`${altText} - thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
