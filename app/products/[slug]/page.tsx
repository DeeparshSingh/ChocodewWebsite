import { products } from "@/data/products";
import { ProductDetails } from "@/components/products/product-details";
import { RelatedProducts } from "@/components/products/related-products";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: product.name,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16">
      <ProductDetails product={product} />
      
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
}