"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Filter products to show only featured ones
  const featuredProducts = products.filter(product => product.featured);
  
  // Calculate how many products to show based on screen width
  const getProductsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };
  
  const [productsToShow, setProductsToShow] = useState(getProductsToShow());
  
  // Update products to show on window resize
  useEffect(() => {
    const handleResize = () => {
      const newProductsToShow = getProductsToShow();
      if (newProductsToShow !== productsToShow) {
        setProductsToShow(newProductsToShow);
        // Reset current index if it would cause empty spaces
        if (currentIndex + newProductsToShow > featuredProducts.length) {
          setCurrentIndex(Math.max(0, featuredProducts.length - newProductsToShow));
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [productsToShow, currentIndex, featuredProducts.length]);
  
  const nextSlide = () => {
    const maxIndex = Math.max(0, featuredProducts.length - productsToShow);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };
  
  return (
    <div className="relative">
      <div className="flex space-x-4 items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full hidden md:flex" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div ref={carouselRef} className="flex-1 overflow-hidden">
          <motion.div 
            className="flex"
            initial={false}
            animate={{ 
              x: `-${(100 / productsToShow) * currentIndex}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-3"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full hidden md:flex" 
          onClick={nextSlide}
          disabled={currentIndex >= featuredProducts.length - productsToShow}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Mobile navigation controls */}
      <div className="flex justify-center space-x-2 mt-6 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-9 w-9" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-9 w-9" 
          onClick={nextSlide}
          disabled={currentIndex >= featuredProducts.length - productsToShow}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}