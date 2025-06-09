"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ContactInfo() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi, I'd like to know more about Chocodew products.");
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-0 bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl md:text-3xl font-semibold">Contact Information</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Get in touch with us through any of these channels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
        <div className="space-y-6">
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ x: 5 }}
          >
            <div className="mt-1 bg-primary/10 p-3 rounded-full shadow-sm">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-roboto font-medium text-lg mb-1">Address</h3>
              <p className="text-muted-foreground font-roboto">
              SCO 10, Kapoor Hospital Market, Ludhiana, Punjab 141008, India<br />
                {process.env.NEXT_PUBLIC_ADDRESS}
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ x: 5 }}
          >
            <div className="mt-1 bg-primary/10 p-3 rounded-full shadow-sm">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-roboto font-medium text-lg mb-1">Phone</h3>
              <div className="flex flex-wrap items-center">
                <a 
                  href="tel:+919876333111" 
                  className="text-muted-foreground font-roboto hover:text-primary transition-all duration-300"
                >
                  +91-9876333111
                </a>
                <span className="text-muted-foreground font-roboto">,&nbsp;</span>
                <a 
                  href="tel:+919878555111" 
                  className="text-muted-foreground font-roboto hover:text-primary transition-all duration-300"
                >
                  +91-9878555111
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            <div className="mt-1 bg-primary/10 p-3 rounded-full shadow-sm">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-roboto font-medium text-lg mb-1">Email</h3>
              <a 
                href="mailto:chocodew@gmail.com" 
                className="text-muted-foreground font-roboto hover:text-primary transition-all duration-300"
              >
                chocodew@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="pt-6 pb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h3 className="font-roboto font-semibold text-lg mb-3 text-primary">Business Hours</h3>
          <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base font-roboto">
            <div className="font-medium text-gray-800 dark:text-gray-200">Monday - Friday:</div>
            <div className="font-medium text-gray-900 dark:text-white">9:00 AM - 6:00 PM</div>
            <div className="font-medium text-gray-800 dark:text-gray-200">Saturday:</div>
            <div className="font-medium text-gray-900 dark:text-white">10:00 AM - 4:00 PM</div>
            <div className="font-medium text-gray-800 dark:text-gray-200">Sunday:</div>
            <div className="font-medium text-gray-900 dark:text-white">Closed</div>
          </div>
        </motion.div>
        
        <motion.div 
          className="pt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full flex items-center gap-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg"
            size="lg"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="font-roboto">Chat on WhatsApp</span>
          </Button>
        </motion.div>
      </CardContent>
    </Card>
    </motion.div>
  );
}