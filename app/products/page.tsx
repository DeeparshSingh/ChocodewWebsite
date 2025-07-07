"use client";

import { ProductTabs } from "@/components/products/product-tabs";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      <AuroraBackground className="w-full min-h-[50vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0,
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="max-w-7xl mx-auto px-4 pt-32 pb-12 md:pt-40 md:pb-16 relative z-10"
        >
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-primary">
              Our Premium Products
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Chocodew offers a comprehensive range of high-quality vending machines and premium 
              beverage mixes that deliver exceptional taste and reliability.
            </p>
          </div>
        </motion.div>
      </AuroraBackground>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <ProductTabs />
      </div>
    </div>
  );
}