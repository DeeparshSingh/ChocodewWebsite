import { CalculatorForm } from "@/components/calculator/calculator-form";
import { HeroSection } from "@/components/calculator/hero-section";
import { Calculator } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premix Calculator",
  description: "Calculate your monthly premix requirements for tea, coffee, or soup with our easy-to-use premix calculator.",
};

export default function CalculatorPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-neutral-50/50 to-white pt-24 sm:pt-0">
      <HeroSection 
        title="Calculate Your Premix Needs"
        description="Estimate your monthly premix needs in just 30 seconds! Our calculator helps you determine exactly how much premix you'll need based on your consumption."
        actions={[
          {
            text: "Start Calculating",
            href: "#calculator",
            icon: <Calculator className="h-5 w-5" />,
            variant: "default"
          }
        ]}
        image={{
          light: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI0OCIgaGVpZ2h0PSI3NjUiIHZpZXdCb3g9IjAgMCAxMjQ4IDc2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L3N2Zz4=",
          dark: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI0OCIgaGVpZ2h0PSI3NjUiIHZpZXdCb3g9IjAgMCAxMjQ4IDc2NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L3N2Zz4=",
          alt: ""
        }}
      >
        <div id="calculator" className="w-full mx-auto p-6 max-w-lg scroll-mt-24">
          <CalculatorForm />
        </div>
      </HeroSection>
    </div>
  );
}