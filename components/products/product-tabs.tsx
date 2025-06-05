"use client";

import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { products } from "@/data/products";
import { useSearchParams, useRouter } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Coffee, Package, Droplets, Candy } from "lucide-react";

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

  const navItems = [
    { 
      name: "Vending Machines", 
      url: "/products?tab=machines", 
      icon: Coffee 
    },
    { 
      name: "Premixes", 
      url: "/products?tab=premixes", 
      icon: Package 
    },
    { 
      name: "Water Dispensers", 
      url: "/products?tab=dispensers", 
      icon: Droplets 
    },
    { 
      name: "Chocolates", 
      url: "/products?tab=chocolates", 
      icon: Candy 
    }
  ];
  
  useEffect(() => {
    if (tabParam && categories.includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="w-full">
      <NavBar items={navItems} className="mb-6 md:mb-8" />

      <div className="px-4 md:px-0">
        <div className={activeTab === "machines" ? "block" : "hidden"}>
          <ProductGrid products={getFilteredProducts("machines")} />
        </div>
        
        <div className={activeTab === "premixes" ? "block" : "hidden"}>
          <ProductGrid products={getFilteredProducts("premixes")} />
        </div>
        
        <div className={activeTab === "dispensers" ? "block" : "hidden"}>
          <ProductGrid products={getFilteredProducts("dispensers")} />
        </div>
        
        <div className={activeTab === "chocolates" ? "block" : "hidden"}>
          <ProductGrid products={getFilteredProducts("chocolates")} />
        </div>
      </div>
    </div>
  );
}