"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SplitText } from "@/components/ui/split-text";
import { motion } from "framer-motion";
import { Coffee, Award, Truck, HeartHandshake } from "lucide-react";

const valueProps = [
  {
    icon: <Coffee className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Premium Quality",
    description: "Our beverage mixes are crafted from the finest ingredients to ensure exceptional taste and aroma in every cup."
  },
  {
    icon: <Award className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "ISO 9001:2015 Certified",
    description: "Our rigorous quality management system ensures consistent excellence in all our products and services."
  },
  {
    icon: <Truck className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Reliable Service",
    description: "Prompt installation, regular maintenance, and timely supplies keep your vending operations running smoothly."
  },
  {
    icon: <HeartHandshake className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
    title: "Customer Focused",
    description: "Our dedicated team provides personalized support and solutions tailored to your specific requirements."
  }
];

export function ValueProps() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full py-8 md:py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-12">
          <SplitText text="Why Choose Chocodew?" className="text-2xl md:text-3xl lg:text-4xl font-bold font-playfair mb-6 md:mb-12"/>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4 pt-4">
            Our commitment to excellence and customer satisfaction sets us apart in the beverage vending industry.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {valueProps.map((prop, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="card-hover h-full border-none shadow-md">
                <CardHeader className="pb-2 flex flex-col items-center text-center space-y-2 md:space-y-3 p-3 md:p-6">
                  <div className="p-2 md:p-3 rounded-full bg-primary/10">
                    {prop.icon}
                  </div>
                  <CardTitle className="text-base md:text-lg">{prop.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-3 pb-4">
                  <p className="text-xs md:text-sm text-muted-foreground">{prop.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}