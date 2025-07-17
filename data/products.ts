import { Product } from "@/types/product";

export const products: Product[] = [
  // ——— MACHINES ———
  {
    id: "vm-002",
    name: "Coffee Vending Machine 2 Option",
    slug: "coffee-vending-machine-2-option",
    category: "machines",
    images: [
      "/images/products/machines/chocodew-2-options-vending-machine-right.jpeg",
      "/images/products/machines/chocodew-2-options-vending-machine-left.jpeg"
    ],
    shortDescription: "Compact, sleek vending machine offering two perfect beverage options.",
    description: "This machine combines elegance with simplicity, delivering two flawless beverage choices at the touch of a button. Designed for smaller offices and intimate settings, its intuitive design ensures quality and ease, every cup.",
    featured: false,
    specs: [
      { name: "Dimensions", value: "120 x 45 x 50 cm" },
      { name: "Capacity", value: "150 cups" },
      { name: "Power", value: "220–240 V, 1500 W" },
      { name: "Options", value: "2 beverages" },
      { name: "Water Supply", value: "Tank or direct connection" },
      { name: "Material", value: "Stainless steel & ABS" }
    ],
    features: [
      "Two preset beverage options",
      "Quick-brew technology for fast service",
      "User-friendly button interface",
      "Compact footprint for small spaces",
      "Energy-saving standby mode",
      "Easy-to-clean design",
      "Removable drip tray",
      "Low-noise operation"
    ]
  },
  {
    id: "vm-003",
    name: "Coffee Vending Machine 3 Option",
    slug: "coffee-vending-machine-3-option",
    category: "machines",
    images: [
      "/images/products/machines/chocodew-3-options-vending-machine-right.jpeg",
      "/images/products/machines/chocodew-3-options-vending-machine-left.jpeg"
    ],
    shortDescription: "Stylish three-option vending machine for versatile beverage experiences.",
    description: "Your versatile companion, offering three distinct beverage options tailored for diverse tastes. Ideal for medium-sized workplaces and reception areas, it promises consistent, premium quality with every pour.",
    featured: false,
    specs: [
      { name: "Dimensions", value: "140 x 50 x 55 cm" },
      { name: "Capacity", value: "250 cups" },
      { name: "Power", value: "220–240 V, 1800 W" },
      { name: "Options", value: "3 beverages" },
      { name: "Water Supply", value: "Direct connection" },
      { name: "Material", value: "Stainless steel" }
    ],
    features: [
      "Three selectable drink choices",
      "Digital display with selection dial",
      "Programmable strength settings",
      "Self-cleaning function",
      "Rapid heating system",
      "Compact, stylish design",
      "Automatic refill alerts",
      "Remote diagnostics support"
    ]
  },
  {
    id: "vm-004",
    name: "Coffee Vending Machine 4 Option",
    slug: "coffee-vending-machine-4-option",
    category: "machines",
    images: [
      "/images/products/machines/chocodew-4-options-vending-machine-right.jpeg",
      "/images/products/machines/chocodew-4-options-vending-machine-left.jpeg"
    ],
    shortDescription: "Versatile four-option beverage vending machine with intuitive controls.",
    description: "Elevate your coffee break, offering four carefully crafted beverage selections designed for bustling environments. Its seamless operation and contemporary aesthetics make it a favorite for offices, institutions, and exhibition venues.",
    featured: true,
    specs: [
      { name: "Dimensions", value: "160 x 55 x 60 cm" },
      { name: "Capacity", value: "400 cups" },
      { name: "Power", value: "220–240 V, 2000 W" },
      { name: "Options", value: "4 beverages" },
      { name: "Water Supply", value: "Direct connection" },
      { name: "Material", value: "Stainless steel & glass" }
    ],
    features: [
      "Four customizable beverage options",
      "Touchscreen interface",
      "Adjustable cup sizes",
      "Automatic cleaning cycles",
      "Energy-efficient heating",
      "Real-time usage statistics",
      "Mobile app monitoring",
      "Secure access for ingredient refills"
    ]
  },
  {
    id: "vm-007",
    name: "Coffee Vending Machine 7 Option",
    slug: "coffee-vending-machine-7-option",
    category: "machines",
    images: [
      "/images/products/machines/chocodew-7-options-vending-machine-right.jpeg",
      "/images/products/machines/chocodew-7-options-vending-machine-left.jpeg"
    ],
    shortDescription: "Premium vending machine offering seven exceptional beverage options.",
    description: "Sets the gold standard for vending solutions, boasting seven customizable beverage options to satisfy every preference. Perfectly designed for large offices, hotels, and high-footfall environments, it promises reliability, sophistication, and superior taste.",
    featured: true,
    specs: [
      { name: "Dimensions", value: "180 x 60 x 60 cm" },
      { name: "Capacity", value: "700 cups" },
      { name: "Power", value: "220–240 V, 2500 W" },
      { name: "Options", value: "7 beverages" },
      { name: "Water Supply", value: "Direct connection with filtration" },
      { name: "Material", value: "Stainless steel & tempered glass" }
    ],
    features: [
      "Seven gourmet drink selections",
      "Intuitive full-color touchscreen",
      "Customizable cup strength and size",
      "Automatic cleaning & maintenance alerts",
      "High-capacity internal water reservoir",
      "Advanced bean-to-cup brewing",
      "Cloud connectivity for remote management",
      "Eco-friendly power-saving modes"
    ]
  },

  // ——— PREMIXES ———
  {
    id: "pm-001",
    name: "Premium Instant Coffee",
    slug: "premium-instant-coffee",
    category: "premixes",
    images: [
      "/images/products/premixes/premium-instant-coffee.jpeg"
    ],
    shortDescription: "Bold, aromatic instant coffee blend for the perfect cup every time.",
    description: "Crafted for coffee lovers, our Premium Instant Coffee offers a robust and satisfying flavor instantly. Available in regular and low-sugar varieties, it delivers consistent excellence in every sip.",
    featured: true,
    specs: [
      { name: "Weight", value: "1 kg bag" },
      { name: "Yield", value: "≈ 100 cups" },
      { name: "Ingredients", value: "100% instant coffee" },
      { name: "Variants", value: "Regular & Low Sugar" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" }
    ],
    features: [
      "Rich, robust coffee aroma",
      "Smooth and balanced taste",
      "Dissolves instantly, no residue",
      "Available in low sugar variant",
      "Perfect for vending machines",
      "Vacuum-sealed for freshness",
      "No artificial additives"
    ]
  },
  {
    id: "pm-002",
    name: "Masala Tea Premix",
    slug: "masala-tea-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/masala-tea-premix.jpeg"
    ],
    shortDescription: "Traditional spiced tea with authentic Indian flavor in seconds.",
    description: "Enjoy the warmth of traditional Masala Tea instantly. A delightful blend of spices infused with premium tea, crafted to provide an authentic, comforting experience—also in a healthier low sugar option.",
    featured: true,
    specs: [
      { name: "Weight", value: "1 kg pack" },
      { name: "Yield", value: "≈ 80 cups" },
      { name: "Ingredients", value: "Tea, cardamom, cinnamon, ginger" },
      { name: "Variants", value: "Regular & Low Sugar" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" }
    ],
    features: [
      "Authentic Indian spices",
      "Rich and aromatic taste",
      "Instantly dissolvable",
      "Low sugar variant available",
      "Perfect consistency every time",
      "Ideal for vending machines",
      "Preservative-free blend"
    ]
  },
  {
    id: "pm-003",
    name: "Dairy Whitener",
    slug: "dairy-whitener",
    category: "premixes",
    images: [
      "/images/products/premixes/dairy-whitener-premix.jpeg"
    ],
    shortDescription: "Instant dairy whitener for a creamy, rich beverage experience.",
    description: "Elevate your beverage instantly with our Dairy Whitener. Expertly formulated for smoothness and creaminess, it blends seamlessly into your tea or coffee, enhancing every sip effortlessly.",
    featured: false,
    specs: [
      { name: "Weight", value: "1 kg bag" },
      { name: "Yield", value: "≈ 200 servings" },
      { name: "Ingredients", value: "Milk solids, stabilizers" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Per Serving", value: "5 g" }
    ],
    features: [
      "Rich, creamy texture",
      "Instantly dissolvable",
      "Consistent quality every serving",
      "Ideal for coffee, tea, and desserts",
      "No artificial flavors",
      "Long-lasting freshness",
      "Convenient, economical choice"
    ]
  },
  {
    id: "pm-004",
    name: "Tomato Soup Premix",
    slug: "tomato-soup-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/tomato-soup-premix.jpeg"
    ],
    shortDescription: "Rich and hearty instant tomato soup with real flavor.",
    description: "Our Tomato Soup Premix offers instant warmth and comfort, blending ripe tomatoes and gentle spices for a satisfying experience. Crafted for quick preparation without compromising authentic flavor.",
    featured: false,
    specs: [
      { name: "Weight", value: "1 kg bag" },
      { name: "Yield", value: "≈ 120 cups" },
      { name: "Ingredients", value: "Tomato, herbs, spices" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Per Cup", value: "8 g" }
    ],
    features: [
      "Rich, hearty taste",
      "Real tomato flavor",
      "Smooth, velvety texture",
      "Instantly ready",
      "Perfect snack or starter",
      "No artificial preservatives",
      "Ideal for vending machines"
    ]
  },
  {
    id: "pm-005",
    name: "Cappuccino Coffee Premix",
    slug: "cappuccino-coffee-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/cappuccino-coffee-premix.jpeg"
    ],
    shortDescription: "Creamy and frothy instant cappuccino with authentic café taste.",
    description: "Savor café-style indulgence instantly with our Cappuccino Coffee Premix. Smooth, creamy, and frothy—crafted for an authentic cappuccino experience at home or office, with a healthier low sugar variant available.",
    featured: true,
    specs: [
      { name: "Weight", value: "1 kg bag" },
      { name: "Yield", value: "≈ 100 cups" },
      { name: "Ingredients", value: "Instant coffee, milk powder, sugar" },
      { name: "Variants", value: "Regular & Low Sugar" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" }
    ],
    features: [
      "Creamy, café-like froth",
      "Rich espresso notes",
      "Instantly dissolvable",
      "Low sugar variant option",  
      "Consistent café-quality taste",  
      "No artificial flavors",  
      "Vending machine compatible"
    ]
  },
  {
    id: "pm-006",
    name: "Lemon Tea Premix",
    slug: "lemon-tea-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/lemon-tea-premix.jpeg"
    ],
    shortDescription: "Invigorating instant lemon tea, fresh and crisp in every sip.",
    description: "Brighten your day instantly with our Lemon Tea Premix. Fresh, crisp, and perfectly balanced, it offers a refreshing and invigorating experience, perfect for any moment.",
    featured: false,
    specs: [
      { name: "Weight", value: "1 kg pack" },
      { name: "Yield", value: "≈ 120 cups" },
      { name: "Ingredients", value: "Tea powder, lemon flavor" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Per Cup", value: "8 g" }
    ],
    features: [
      "Fresh lemon flavor",
      "Crisp and refreshing taste",
      "Instantly dissolvable",
      "Natural ingredients",
      "Consistent flavor in every cup",
      "Ideal for vending machines",
      "Economically convenient"
    ]
  },
  {
    id: "pm-007",
    name: "Cardamom Tea Premix",
    slug: "cardamom-tea-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/cardamom-tea-premix.jpeg"
    ],
    shortDescription: "Delightfully aromatic instant cardamom tea blend.",
    description: "Indulge in the exotic fragrance of cardamom instantly. Our Cardamom Tea Premix blends premium tea leaves with aromatic cardamom, offering an authentic, soothing tea experience effortlessly.",
    featured: true,
    specs: [
      { name: "Weight", value: "1 kg pack" },
      { name: "Yield", value: "≈ 90 cups" },
      { name: "Ingredients", value: "Tea powder, cardamom" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Per Cup", value: "10 g" }
    ],
    features: [
      "Rich cardamom aroma",
      "Smooth, soothing flavor",
      "Dissolves instantly",
      "Authentic taste",
      "Preservative-free blend",
      "Perfect for vending machines",
      "Economical per serving"
    ]
  },
  {
    id: "pm-008",
    name: "Choco Milk Premix",
    slug: "choco-milk-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/choco-milk-premix.jpeg"
    ],
    shortDescription: "Deliciously rich instant chocolate milk premix.",
    description: "Our Choco Milk Premix combines smooth chocolate and creamy milk for an instant indulgence. Enjoy rich, chocolatey goodness with every sip—perfect for kids and adults alike.",
    featured: false,
    specs: [
      { name: "Weight", value: "1 kg bag" },
      { name: "Yield", value: "≈ 100 cups" },
      { name: "Ingredients", value: "Milk powder, cocoa, sugar" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Per Cup", value: "10 g" }
    ],
    features: [
      "Smooth, chocolate-rich taste",
      "Instantly dissolvable",
      "Creamy milkiness",
      "Ideal for hot or cold beverages",
      "No artificial flavors",
      "Vending machine compatible",
      "Perfect for all ages"
    ]
  },
  {
    id: "pm-009",
    name: "Chicory Coffee Premix",
    slug: "chicory-coffee-premix",
    category: "premixes",
    images: [
      "/images/products/premixes/chicory-coffee-premix.jpeg"
    ],
    shortDescription: "Instant coffee premix enhanced with smooth, roasted chicory.",
    description: "Discover coffee perfection with our Chicory Coffee Premix. Expertly blended coffee and chicory offer a smooth, well-rounded taste, delivering delightful satisfaction instantly, every time.",
    featured: false,
    specs: [
      { name: "Weight", value: "1 kg bag" },
      { name: "Yield", value: "≈ 100 cups" },
      { name: "Ingredients", value: "Instant coffee, roasted chicory" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Per Cup", value: "10 g" }
    ],
    features: [
      "Smooth, balanced flavor",
      "Enhanced with roasted chicory",
      "Instantly dissolvable",
      "Rich, satisfying aroma",
      "No artificial additives",
      "Ideal for vending machines",
      "Economical choice"
    ]
  },

  // ——— WATER DISPENSERS ———
  {
    id: "wd-001",
    name: "Hot and Cold Water Dispenser",
    slug: "hot-and-cold-water-dispenser",
    category: "dispensers",
    images: [
      "/images/products/machines/hot-cold-and-normal-dispenser.jpeg"
    ],
    shortDescription: "Stylish dispenser offering instant access to hot and cold water.",
    description: "Delivers instant, crystal-clear hot and cold water, ensuring convenience and freshness at home or in the office. Its sleek stainless-steel construction and reliable cooling system keep hydration effortless and enjoyable.",
    featured: false,
    specs: [
      { name: "Dimensions", value: "100 x 40 x 40 cm" },
      { name: "Capacity", value: "5 L hot, 5 L cold" },
      { name: "Power", value: "220–240 V, 500 W" },
      { name: "Temperatures", value: "Hot: 90–95 °C, Cold: 5–10 °C" },
      { name: "Filtration", value: "Built-in charcoal filter" },
      { name: "Material", value: "Stainless steel & ABS" }
    ],
    features: [
      "Instant hot and cold water",
      "Safety lock on hot water",
      "LED temperature display",
      "Removable drip tray",
      "Quiet cooling compressor",
      "Energy-efficient insulation",
      "Easy filter replacement",
      "Compact design for home or office"
    ]
  },
  {
    id: "wd-002",
    name: "Hot and Cold Water Dispenser Jumbo",
    slug: "hot-and-cold-water-dispenser-jumbo",
    category: "dispensers",
    images: [
      "/images/products/machines/JUMBO-DISPENSER-with-big-cooling-capacity.jpeg"
    ],
    shortDescription: "High-capacity dispenser with superior cooling performance.",
    description: "Designed for demanding environments, offering extended cooling capacity and faster temperature regulation. Its durable build and efficient thermostat ensure consistently chilled and piping hot water, ideal for high-volume usage areas.",
    featured: false,
    specs: [
      { name: "Dimensions", value: "120 x 45 x 45 cm" },
      { name: "Capacity", value: "10 L hot, 10 L cold" },
      { name: "Power", value: "220–240 V, 650 W" },
      { name: "Temperatures", value: "Hot: 90–95 °C, Cold: 4–8 °C" },
      { name: "Filtration", value: "Dual-stage filtration system" },
      { name: "Material", value: "Stainless steel" }
    ],
    features: [
      "High-volume dispensing",
      "Enhanced cooling with fast recovery",
      "Digital temperature controls",
      "Overheat protection",
      "Large capacity water tanks",
      "Removable drip tray",
      "Stainless steel reservoir",
      "Low-maintenance design"
    ]
  },
  {
    id: "wd-003",
    name: "Hot and Cold Water Dispenser with Fridge",
    slug: "hot-and-cold-water-dispenser-with-fridge",
    category: "dispensers",
    images: [
      "/images/products/machines/Hot-cold-and-normal-dispenser-cooling-cabinet.jpeg"
    ],
    shortDescription: "Multi-functional dispenser with integrated refrigeration compartment.",
    description: "Combines a premium hot and cold water dispenser with an integrated mini-fridge, perfect for keeping beverages and snacks fresh. Its innovative design makes it an ideal solution for offices, waiting rooms, and hospitality spaces.",
    featured: true,
    specs: [
      { name: "Dimensions", value: "120 x 50 x 50 cm" },
      { name: "Capacity", value: "5 L hot, 5 L cold; 20 L fridge" },
      { name: "Power", value: "220–240 V, 700 W" },
      { name: "Temperatures", value: "Hot: 90–95 °C, Cold: 5–10 °C; Fridge: 2–8 °C" },
      { name: "Filtration", value: "Sediment & charcoal filter" },
      { name: "Material", value: "Stainless steel & glass door" }
    ],
    features: [
      "Integrated mini refrigerator",
      "Dual hot and cold dispensing",
      "Adjustable thermostat for fridge",
      "Transparent fridge door",
      "Safety lock on hot tap",
      "LED lighting inside fridge",
      "Easy-to-clean surfaces",
      "Energy-saving compressor"
    ]
  }
];
