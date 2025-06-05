"use client";

import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export function TypingAnimation({
  text,
  duration = 150,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          // No need to unobserve if we want it to re-animate if text changes and it's still visible
          // or if we want it to animate every time it becomes visible (remove hasBeenVisible check below then)
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Effect to reset animation state when text prop changes or when component becomes visible
  useEffect(() => {
    if (hasBeenVisible) {
      // If component is visible, reset animation for new text or initial appearance
      setI(0);
      setDisplayedText("");
    } 
    // If hasBeenVisible becomes false, the rendered output becomes "" due to the ternary in JSX.
    // The state of i and displayedText is retained but not shown, which is fine.
    // When it becomes visible again, this effect will trigger and reset them.
  }, [text, hasBeenVisible]);

  // Effect to run the typing interval
  useEffect(() => {
    // Only run the interval if the component is visible and the animation is not yet complete
    if (!hasBeenVisible || i >= text.length) {
      return; 
    }

    const typingEffect = setInterval(() => {
      // Check i < text.length again inside interval, though outer condition should cover
      if (i < text.length) { 
        setDisplayedText(text.substring(0, i + 1));
        setI((prevI) => prevI + 1); // Use functional update for setI
      } else {
        // This else should ideally not be reached if i >= text.length check is robust above
        // but as a safeguard, clear interval. The main clearing happens in cleanup.
        clearInterval(typingEffect); 
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
    // Dependencies: 
    // - duration: if animation speed changes.
    // - i: to re-evaluate if interval should continue/stop.
    // - text: text.length is used, so if text changes, interval logic might need re-evaluation (reset effect handles actual reset).
    // - hasBeenVisible: to stop/start interval based on visibility.
  }, [duration, i, text, hasBeenVisible]);

  return (
    <h1
      ref={ref}
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm min-h-[2.5rem]", // Added min-h-[5rem]
        className,
      )}
    >
      {hasBeenVisible ? displayedText : "\u00A0"} 
    </h1>
  );
}
