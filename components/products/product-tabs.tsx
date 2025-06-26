"use client";

import { ProductGrid } from "@/components/products/product-grid";
import { products } from "@/data/products";
import { useSearchParams } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Coffee, Package, Droplets, Candy } from "lucide-react";

export function ProductTabs() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  
  const categories = ["machines", "premixes", "dispensers"];
  
  const activeTab = (tabParam && categories.includes(tabParam)) ? tabParam : "machines";
  
  const getFilteredProducts = (category: string) => {
    return products.filter(product => product.category === category);
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
    }
  ];

  const activeItem = navItems.find(item => item.url.includes(`tab=${activeTab}`));
  const activeItemName = activeItem ? activeItem.name : navItems[0].name;

  return (
    <div className="w-full">
      <NavBar items={navItems} className="mb-6 md:mb-8" activeItemName={activeItemName} />

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
        

      </div>
    </div>
  );
}