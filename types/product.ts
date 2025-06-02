export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "machines" | "premixes" | "dispensers" | "chocolates";
  image: string;
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