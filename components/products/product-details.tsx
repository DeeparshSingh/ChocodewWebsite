"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { Product } from "@/types/product";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from 'lucide-react';
import { ProductEnquiryModal } from "@/components/products/product-enquiry-modal";
import { ImageLightbox } from "@/components/products/image-lightbox";
import { ProductImageCarousel } from "@/components/products/product-image-carousel";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const itemAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name}`);
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      {/* Product Image */}
      <motion.div 
        className="md:sticky md:top-24 self-start" // Adjusted for top alignment with sticky
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md lg:max-w-lg mx-auto">
          <ProductImageCarousel
            images={product.images}
            altText={product.name}
            options={{ loop: true }}
            onMainImageClick={() => setLightboxOpen(true)}
          />
        </div>
      </motion.div>

      {/* Product Information */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
      >
        <motion.div variants={itemAnimation} className="flex flex-wrap items-center gap-3 mb-3">
          <Badge className="text-xs px-3 py-1 bg-secondary text-secondary-foreground">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
          {product.featured && (
            <Badge variant="outline" className="text-xs px-3 py-1 border-accent text-accent">
              Featured Product
            </Badge>
          )}
        </motion.div>

        <motion.h1 variants={itemAnimation} className="text-3xl md:text-4xl font-bold mb-4">{product.name}</motion.h1>
        
        <motion.p variants={itemAnimation} className="text-muted-foreground mb-6">{product.description}</motion.p>
        
        <motion.div variants={itemAnimation}><Separator className="my-8" /></motion.div>
        
        {/* Product Specifications */}
        <motion.div variants={itemAnimation} className="mb-6">
          <h3 className="font-semibold text-xl md:text-2xl mb-4">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {product.specs.map((spec, index) => (
              <div key={index} className="flex">
                <span className="text-muted-foreground w-24 flex-shrink-0">{spec.name}:</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemAnimation}><Separator className="my-8" /></motion.div>
        
        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <motion.div variants={itemAnimation} className="mb-8">
            <h3 className="font-semibold text-xl md:text-2xl mb-4">Features</h3>
            <div className="mt-3 space-y-3">
              {product.features.map((feature, index) => (
                <motion.div key={index} variants={itemAnimation} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-base text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Call to Action Buttons */}
        <motion.div variants={itemAnimation} className="flex flex-wrap gap-4 mt-8">
          <Button onClick={() => setShowEnquiryModal(true)} size="lg">
            Request Information
          </Button>
          <Button variant="outline" size="lg" onClick={handleWhatsAppClick}>
            Contact via WhatsApp
          </Button>
        </motion.div>
      </motion.div>

      <ProductEnquiryModal 
        product={product}
        open={showEnquiryModal}
        onOpenChange={setShowEnquiryModal}
      />
          <ImageLightbox
        src={product.images[0]}
        alt={product.name}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}