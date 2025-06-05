"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if a CSS media query matches.
 * @param query The media query string (e.g., '(min-width: 768px)').
 * @returns True if the query matches, false otherwise.
 */
export function useMediaQuery(query: string): boolean {
  // Initialize state with a function to avoid window access during SSR/build
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Default value for SSR/build
  });

  useEffect(() => {
    // Ensure this effect runs only on the client
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);

    // Set initial state correctly once on client
    listener(); 

    // Safari < 14 needs addListener/removeListener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener); // Deprecated but needed for older Safari
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener); // Deprecated
      }
    };
  }, [query]);

  return matches;
}
