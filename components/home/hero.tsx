"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative w-full h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1500')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Premium Beverage Vending Solutions for Your Business
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl leading-relaxed">
              Enhance your workspace with our ISO 9001:2015 certified vending machines and 
              premium beverage mixes, designed for exceptional taste and reliability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent hover:bg-white/10 text-white border-white hover:text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/30 to-transparent z-[1]"
      />
    </div>
  );
}