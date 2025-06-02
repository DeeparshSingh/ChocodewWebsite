"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import { useState } from "react";
import { motion } from "framer-motion";
import { ProductEnquiryModal } from "@/components/products/product-enquiry-modal";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi, I'm interested in ${product.name}`);
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      {/* Product Image */}
      <motion.div 
        className="bg-muted rounded-lg overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover aspect-square"
        />
      </motion.div>

      {/* Product Information */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Badge className="text-xs px-3 py-1 bg-secondary text-secondary-foreground">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
          {product.featured && (
            <Badge variant="outline" className="text-xs px-3 py-1 border-accent text-accent">
              Featured Product
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
        
        <p className="text-muted-foreground mb-6">{product.description}</p>
        
        <Separator className="my-6" />
        
        {/* Product Specifications */}
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-3">Specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {product.specs.map((spec, index) => (
              <div key={index} className="flex">
                <span className="text-muted-foreground w-24 flex-shrink-0">{spec.name}:</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />
        
        {/* Product Features and Details Tabs */}
        <Tabs defaultValue="features" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="p-4 rounded-md bg-muted/50 mt-2">
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="details" className="p-4 rounded-md bg-muted/50 mt-2">
            <p>{product.detailsText || "Detailed information about this product will be provided upon request."}</p>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => setShowEnquiryModal(true)} size="lg">
            Request Information
          </Button>
          <Button variant="outline" size="lg" onClick={handleWhatsAppClick}>
            Contact via WhatsApp
          </Button>
        </div>
      </motion.div>

      <ProductEnquiryModal 
        product={product}
        open={showEnquiryModal}
        onOpenChange={setShowEnquiryModal}
      />
    </div>
  );
}