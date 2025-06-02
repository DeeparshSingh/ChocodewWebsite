"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid } from "@/components/products/product-grid";
import { products } from "@/data/products";
import { useSearchParams, useRouter } from "next/navigation";

export function ProductTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  
  const categories = ["machines", "premixes", "dispensers", "chocolates"];
  
  const [activeTab, setActiveTab] = useState(
    categories.includes(tabParam as string) ? tabParam : "machines"
  );
  
  const getFilteredProducts = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/products?tab=${value}`, { scroll: false });
  };
  
  useEffect(() => {
    if (tabParam && categories.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <Tabs 
      defaultValue={activeTab as string} 
      value={activeTab as string}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <div className="flex justify-center mb-6 md:mb-8 px-4">
        <TabsList className="bg-muted rounded-full h-auto p-1 flex flex-wrap justify-center gap-2">
          <TabsTrigger 
            value="machines" 
            className="rounded-full px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base data-[state=active]:bg-white whitespace-nowrap"
          >
            Vending Machines
          </TabsTrigger>
          <TabsTrigger 
            value="premixes" 
            className="rounded-full px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base data-[state=active]:bg-white whitespace-nowrap"
          >
            Premixes
          </TabsTrigger>
          <TabsTrigger 
            value="dispensers" 
            className="rounded-full px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base data-[state=active]:bg-white whitespace-nowrap"
          >
            Water Dispensers
          </TabsTrigger>
          <TabsTrigger 
            value="chocolates" 
            className="rounded-full px-3 py-1.5 md:px-6 md:py-2 text-sm md:text-base data-[state=active]:bg-white whitespace-nowrap"
          >
            Chocolates
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="px-4 md:px-0">
        <TabsContent value="machines" className="mt-0">
          <ProductGrid products={getFilteredProducts("machines")} />
        </TabsContent>
        
        <TabsContent value="premixes" className="mt-0">
          <ProductGrid products={getFilteredProducts("premixes")} />
        </TabsContent>
        
        <TabsContent value="dispensers" className="mt-0">
          <ProductGrid products={getFilteredProducts("dispensers")} />
        </TabsContent>
        
        <TabsContent value="chocolates" className="mt-0">
          <ProductGrid products={getFilteredProducts("chocolates")} />
        </TabsContent>
      </div>
    </Tabs>
  );
}