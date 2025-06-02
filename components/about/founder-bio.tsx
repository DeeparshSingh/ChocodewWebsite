"use client";

import { motion } from "framer-motion";

export function FounderBio() {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="overflow-hidden rounded-lg"
        >
          <img 
            src="https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Mr. Ravinder Pal Singh, Founder of Chocodew" 
            className="w-full object-cover rounded-lg"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2">Our Founder</h2>
            <p className="text-xl font-medium text-primary">Mr. Ravinder Pal Singh</p>
          </div>
          
          <p>
            With over 20 years of experience in the food and beverage industry, Mr. Ravinder Pal Singh 
            founded Chocodew in 2007 with a vision to revolutionize the beverage vending industry in India.
          </p>
          
          <p>
            Under his leadership, Chocodew has grown from a small local business to a nationally 
            recognized brand with over 2,000 installations across the country. His dedication to quality, 
            innovation, and customer satisfaction has been the driving force behind the company's success.
          </p>
          
          <p>
            "Our mission is to deliver premium beverage solutions that enhance workplace experiences 
            and bring people together over a perfect cup of coffee, tea, or hot chocolate," says Mr. Singh.
          </p>
          
          <p>
            His commitment to maintaining the highest standards of quality led to the company achieving 
            ISO 9001:2015 certification, further solidifying Chocodew's reputation as a trusted 
            provider of beverage vending solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}