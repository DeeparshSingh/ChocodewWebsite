import { useSprings, animated, easings, UseSpringsProps, SpringRef } from '@react-spring/web';

type SupportedEasingNames = Exclude<keyof typeof easings, 'steps'>;
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: CSSProperties; 
  animationTo?: CSSProperties; 
  easing?: SupportedEasingNames; 
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  onLetterAnimationComplete?: () => void;
}

export const SplitText = ({ 
  text = '',
  className = '',
  delay = 30,
  animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' } as CSSProperties,
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' } as CSSProperties,
  easing = 'easeOutCubic',
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const words = text.split(' ').map(word => word.split(''));
  const letters = words.flat();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null); 
  const animatedCount = useRef(0);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return; 

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(currentRef); 
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
        if (currentRef) { 
            observer.unobserve(currentRef);
        }
        observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const [letterSpringStyles, springApi] = useSprings(
    letters.length,
    (i, controller) => ({
      from: animationFrom,
      to: inView
        ? async (startNext) => { // Renamed 'next' to 'startNext' to avoid potential conflict with controller methods
          await startNext(animationTo);
          animatedCount.current += 1;
          if (animatedCount.current === letters.length && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
        : animationFrom,
      delay: i * delay,
      config: { easing: easings[easing] }, 
    }),
    [inView, animationFrom, animationTo, delay, easing, onLetterAnimationComplete, letters.length] // Added letters.length to deps
  );


  const textStyle: React.CSSProperties = { // Добавил тип
    textAlign,
    whiteSpace: 'normal',
    wordWrap: 'break-word',

  };

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={textStyle}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.map((letter, letterIndex) => {
           
            const index = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            return (
              <animated.span
                key={index} 
                style={letterSpringStyles[index]}
                className="inline-block transform transition-opacity will-change-transform" 
              >
                {letter}
              </animated.span>
            );
          })}
          {}
          {wordIndex < words.length - 1 && (
             <span style={{ display: 'inline-block', width: '0.3em' }}> </span>
          )}
        </span>
      ))}
    </p>
  );
};
