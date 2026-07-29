import { Metadata } from "next";
import { CalculatorCard } from "@/components/calculator/calculator-card";
import { CalculatorIntro } from "@/components/calculator/intro";

export const metadata: Metadata = {
  title: "Premix Calculator",
  description:
    "Calculate your monthly premix requirements for tea, coffee, or soup with our easy-to-use premix calculator.",
};

export default function CalculatorPage() {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 to-white">
      <CalculatorIntro />

      <section
        id="calculator"
        className="scroll-mt-24 pb-20 md:pb-28"
        aria-label="Premix calculator"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <CalculatorCard />

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            Estimates use our standard dosing. A 20% buffer keeps machines from
            running dry between refills. Call{" "}
            <a
              href="tel:+919876333111"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              +91 98763 33111
            </a>{" "}
            and we&rsquo;ll plan a refill schedule for your site.
          </p>
        </div>
      </section>
    </div>
  );
}
