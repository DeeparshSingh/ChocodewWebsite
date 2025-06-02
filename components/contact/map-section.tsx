"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function MapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const mapElement = document.getElementById("map-container");
    if (mapElement) {
      observer.observe(mapElement);
    }
    
    return () => {
      if (mapElement) {
        observer.unobserve(mapElement);
      }
    };
  }, [isMounted]);

  return (
    <motion.div 
      className="mt-12 md:mt-16" 
      id="map-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Find Us</h2>
      
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          {!isMapLoaded ? (
            <Skeleton className="w-full h-[300px] md:h-[400px]" />
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.19658822332!2d75.72376075!3d30.9097079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1653379178550!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chocodew Location"
            ></iframe>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}