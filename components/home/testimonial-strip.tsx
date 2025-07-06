"use client";

import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";
import { useRef, useEffect } from "react";

export function TestimonialStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  return (
    <section className="w-full py-10 md:py-16 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">What Our Customers Say</h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          We take pride in delivering exceptional products and services to our clients. 
          Here&apos;s what they have to say about their experience with Chocodew.
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden" ref={stripRef}>
        <div className="scroll flex gap-4 py-2">
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card 
              key={`${testimonial.id}-${index}`} 
              className="flex-shrink-0 w-[190px] sm:w-[220px] md:w-[300px] shadow-sm border-none bg-white"
            >
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-sm mb-3 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}