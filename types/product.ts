export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "machines" | "premixes" | "dispensers";
  images: string[]; // Changed from single image to array for carousel
  shortDescription: string;
  description: string;
  featured: boolean;
  specs: {
    name: string;
    value: string;
  }[];
  features: string[];
  detailsText?: string;
}