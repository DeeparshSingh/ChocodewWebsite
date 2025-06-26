"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, ChevronsDown } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { ButtonProps } from "@/components/ui/button";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: ButtonProps["variant"] | "glow";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
  children,
}: HeroProps & { children?: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "light" ? image.light : image.dark;

  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex flex-col items-center animate-appear gap-4 opacity-0 delay-300 pt-8">
            {actions.map((action, index) => {
              if (action.text === "Start Calculating") {
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center group focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(action.href)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                  >
                    <div
                      className="
                        flex items-center justify-center
                        bg-background/20
                        backdrop-blur-md
                        border border-foreground/10
                        shadow-lg rounded-full
                        px-6 py-3
                        transition-all duration-300
                        group-hover:shadow-xl group-hover:-translate-y-1
                      "
                    >
                      <span className="text-lg font-medium text-primary">
                        {action.text}
                      </span>
                    </div>

                    <ChevronsDown className="h-8 w-8 mt-4 animate-bounce text-primary" />
                  </button>
                );
              } else {
                // Original button rendering logic for other actions
                const { variant, ...rest } = action;
                const buttonVariant = variant === "glow" ? "default" : variant;
                return (
                  <Button
                    key={index}
                    variant={buttonVariant as any}
                    size="lg"
                    asChild
                    className={
                      variant === "glow" ? "relative overflow-hidden" : ""
                    }
                  >
                    <a
                      href={action.href}
                      className="flex items-center gap-2 relative z-10"
                    >
                      {action.icon}
                      {action.text}
                      {variant === "glow" && (
                        <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-75 blur transition-all duration-1000 group-hover:opacity-100" />
                      )}
                    </a>
                  </Button>
                );
              }
            })}
          </div>

          {/* Image with Glow */}
          <div className="relative pt-12">
            <MockupFrame className="animate-appear opacity-0 delay-500" size="small">
              {children || (
                <Mockup type="responsive">
                  <Image
                    src={imageSrc}
                    alt={image.alt}
                    width={1248}
                    height={765}
                    className="h-full w-full object-cover"
                  />
                </Mockup>
              )}
            </MockupFrame>
            <Glow variant="top" className="animate-appear-zoom opacity-0 delay-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
