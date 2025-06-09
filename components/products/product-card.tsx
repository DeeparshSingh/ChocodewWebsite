"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { ProductEnquiryModal } from "@/components/products/product-enquiry-modal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  return (
    <>
      <Card className="card-hover overflow-hidden h-full flex flex-col mx-auto w-[90%] sm:w-full">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw" // Provides hints for responsive image loading
            />
          </Link>
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader className="p-3 md:p-4 pb-0">
          <CardTitle className="text-lg md:text-xl line-clamp-2">
            <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm md:text-base">
            {product.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-2 flex-grow">
          <div className="mt-2 space-y-1">
            {product.specs.slice(0, 3).map((spec, index) => (
              <div key={index} className="flex items-center text-xs md:text-sm">
                <span className="text-muted-foreground w-16 md:w-20 flex-shrink-0">{spec.name}:</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <div className="flex justify-between w-full gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/products/${product.slug}`}>Details</Link>
            </Button>
            <Button size="sm" className="flex-1" onClick={() => setShowEnquiryModal(true)}>
              Enquire
            </Button>
          </div>
        </CardFooter>
      </Card>

      <ProductEnquiryModal 
        product={product}
        open={showEnquiryModal}
        onOpenChange={setShowEnquiryModal}
      />
    </>
  );
}