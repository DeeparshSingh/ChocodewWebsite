"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="w-full py-12 md:py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-primary/95">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
            Estimate Your Monthly Premix Needs in 30 Seconds
          </h2>
          <p className="text-sm md:text-lg text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto">
            Use our simple calculator to determine exactly how much premix you'll need based on your 
            consumption patterns and beverage preferences.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="secondary" 
            className="rounded-full bg-white text-primary hover:bg-white/90 hover:text-primary/90"
          >
            <Link href="/calculator" className="flex items-center gap-2">
              Try Calculator Now
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}