"use client";

import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// A11y constants
const CLOSE_FOCUS_ID = "lightbox-close-btn";

export function ImageLightbox({ src, alt, open, onOpenChange }: ImageLightboxProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Trap focus manually (Radix Dialog handles focus trap automatically), but ensure we return focus to trigger element
  useEffect(() => {
    if (open && wrapperRef.current) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/60 z-50" />
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/60 z-50" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none p-0 bg-transparent border-none focus:outline-none"
        >
        <div
          ref={wrapperRef}
          className="relative w-[90vw] sm:w-full sm:max-w-[90vw] max-h-[90vh] flex flex-col items-center" style={{borderRadius:'0.5rem', overflow:'hidden'}}
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            id={CLOSE_FOCUS_ID}
            aria-label="Close lightbox"
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 z-20 p-2 bg-background/70 backdrop-blur rounded-full text-foreground hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Zoom Controls */}
          <TransformWrapper
            maxScale={4}
            doubleClick={{ disabled: false, step: 1 }}
            wheel={{ step: 0.2 }}
            pinch={{ step: 0.2 }}
            panning={{ velocityDisabled: true }}
          >
            {({
              zoomIn,
              zoomOut,
              resetTransform,
            }: {
              zoomIn: () => void;
              zoomOut: () => void;
              resetTransform: () => void;
            }) => (
              <>
                <div className="flex gap-3 items-center mt-4 md:mt-0 md:absolute md:bottom-3 md:left-1/2 md:-translate-x-1/2 md:z-10">
                  <button
                    aria-label="Zoom in"
                    onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                    className="p-2 rounded-full bg-background/70 backdrop-blur text-foreground hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <button
                    aria-label="Zoom out"
                    onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                    className="p-2 rounded-full bg-background/70 backdrop-blur text-foreground hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center"
                    style={{ minWidth: 44, minHeight: 44 }}
                  >
                    <Minus className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                  <button
                    aria-label="Reset"
                    onClick={(e) => { e.stopPropagation(); resetTransform(); }}
                    className="px-3 py-1 rounded-md bg-background/70 backdrop-blur text-foreground text-sm hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Reset
                  </button>
                </div>
                <TransformComponent>
                  <div className="relative h-full w-full flex items-center justify-center overflow-hidden rounded-lg">
                    {/* Lazy loaded high res image */}
                    <Image
                      src={src}
                      alt={alt}
                      width={1200}
                      height={1200}
                      className="object-contain select-none max-h-[90vh] w-auto h-auto"
                      sizes="(max-width: 768px) 90vw, 90vw"
                      priority={false}
                    />
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
              </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
