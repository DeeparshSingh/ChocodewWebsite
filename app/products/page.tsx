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
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-accent md:text-sm">
              Our Range
            </p>
            <h1 className="font-playfair text-4xl font-bold leading-[1.05] text-primary md:text-6xl lg:text-7xl">
              Everything <span className="italic text-accent">we pour</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground md:mt-6 md:text-lg">
              Vending machines, drink premixes and water dispensers, built for
              exceptional taste and effortless reliability, cup after cup.
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