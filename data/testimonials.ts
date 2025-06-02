interface Testimonial {
  id: string;
  name: string;
  company: string;
  role?: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajiv Sharma",
    company: "Tech Solutions India",
    role: "Office Manager",
    text: "The Elite Series 5000 has been a game-changer for our office. Our team loves the variety of beverages, and the quality is consistently excellent. The service from Chocodew has been outstanding.",
    rating: 5
  },
  {
    id: "t2",
    name: "Priya Mehta",
    company: "Global Finance Corp",
    role: "Facilities Director",
    text: "We've had Chocodew machines in our offices for over 3 years now. The reliability is impressive, and their premixes are far superior to other brands we've tried. Their customer service team is always responsive.",
    rating: 5
  },
  {
    id: "t3",
    name: "Anand Patel",
    company: "Horizon Healthcare",
    role: "Administrative Head",
    text: "Our hospital staff relies on the Chocodew machines throughout their long shifts. The machines are easy to use, and the beverages provide a much-needed boost. Their maintenance team ensures everything runs smoothly.",
    rating: 4
  },
  {
    id: "t4",
    name: "Sunita Reddy",
    company: "Edulight University",
    role: "Procurement Manager",
    text: "Having installed Chocodew vending machines across our campus, we've received excellent feedback from students and faculty alike. The machines are robust, and the company's support is exemplary.",
    rating: 5
  },
  {
    id: "t5",
    name: "Vikram Singh",
    company: "Pinnacle Hotels",
    role: "Operations Director",
    text: "As a hotel chain, beverage quality is crucial to us. Chocodew has consistently delivered exceptional products and service. Our guests frequently compliment the coffee quality from their machines.",
    rating: 5
  },
  {
    id: "t6",
    name: "Meera Joshi",
    company: "Creative Media Agency",
    role: "Office Administrator",
    text: "The Compact Pro 3000 fits perfectly in our creative studio. It's reliable, makes great coffee, and Chocodew's team is always prompt with refills and maintenance. Couldn't be happier with our choice.",
    rating: 4
  },
  {
    id: "t7",
    name: "Kiran Bajaj",
    company: "Nexus Retail Group",
    role: "Store Manager",
    text: "We've installed Chocodew machines in our employee break areas across multiple locations. The machines are trouble-free, and the hot chocolate is a particular favorite among our staff.",
    rating: 5
  }
];