/// <reference types="google.maps" />
"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number; // final zoom level
  initialZoom?: number; // starting zoom level before animating
  className?: string;
}

export default function GoogleMap({
  lat,
  lng,
  zoom = 18,
  initialZoom = 12,
  className,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
    });

    let map: google.maps.Map | undefined;

    loader.load().then(() => {
      const google = window.google as typeof window.google;
      const center = { lat, lng };
      map = new google.maps.Map(mapRef.current as HTMLDivElement, {
        center,
        zoom: initialZoom,
        disableDefaultUI: true,
        gestureHandling: "greedy",
      });

      // Place a marker at the business location
      new google.maps.Marker({ position: center, map });

      // Smooth zoom animation: increment zoom level every 180ms until target
      let current = initialZoom;
      const step = () => {
        current += 0.5;
        map?.setZoom(current);
        if (current < zoom) {
          window.setTimeout(step, 80);
        }
      };
      step();
    });

    // Cleanup on unmount
    return () => {
      if (map && window.google) {
        window.google.maps.event.clearInstanceListeners(map);
      }
    };
  }, [lat, lng, initialZoom, zoom]);

  return (
    <div
      ref={mapRef}
      className={className || "h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden"}
    />
  );
}
