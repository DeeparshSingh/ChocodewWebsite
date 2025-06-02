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
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Get in touch with us through any of these channels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-primary/10 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-muted-foreground">
                Marine International<br />
                {process.env.NEXT_PUBLIC_ADDRESS}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-primary/10 p-2 rounded-full">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Phone</h3>
              <p>
                <a 
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-primary/10 p-2 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p>
                <a 
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <h3 className="font-medium mb-2">Business Hours</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Monday - Friday:</div>
            <div>9:00 AM - 6:00 PM</div>
            <div>Saturday:</div>
            <div>10:00 AM - 4:00 PM</div>
            <div>Sunday:</div>
            <div>Closed</div>
          </div>
        </div>
        
        <motion.div 
          className="pt-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full flex items-center gap-2"
            size="lg"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}