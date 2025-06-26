"use client";

import GoogleMap from "@/components/contact/google-map";

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
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Find Us</h2>
      
      <Card className="w-full overflow-hidden">
        <CardContent className="p-0">
          {!isMapLoaded ? (
            <Skeleton className="w-full h-[300px] md:h-[400px]" />
          ) : (
            <GoogleMap lat={30.92104573419443} lng={75.84921191201626} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}