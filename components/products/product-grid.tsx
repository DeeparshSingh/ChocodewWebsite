"use client";

import { ProductCard } from "@/components/products/product-card";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <p className="text-muted-foreground text-sm md:text-base">No products found in this category.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants} className="w-full">
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}