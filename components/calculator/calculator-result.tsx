"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, ShoppingBag, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CalculatorResultProps {
  bagsPerMonth: number;
  cupsPerMonth: number;
  premixType: string;
  gramsPerCup: number;
}

export function CalculatorResult({
  bagsPerMonth,
  cupsPerMonth,
  premixType,
  gramsPerCup,
}: CalculatorResultProps) {
  const roundedBags = Math.ceil(bagsPerMonth * 10) / 10; // 1 decimal
  const recommendedBags = Math.ceil(roundedBags * 1.2);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi Chocodew, I'd like to order ${recommendedBags} bags of ${premixType} premix. My calculation shows I need approximately ${roundedBags} bags per month.`
    );
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`,
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[22rem] sm:max-w-lg mx-auto"
    >
      <Card className="w-full border-accent/30 bg-gradient-to-br from-secondary/20 to-background">
        <CardHeader className="text-center space-y-2 pb-2">
          <CardTitle>
            
            Your Premix Calculation Results
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm mb-1">Based on your consumption pattern</CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
            <div className="p-4 rounded-lg bg-background shadow-sm">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Monthly Consumption
              </h4>
              <p className="text-2xl md:text-3xl font-bold">{cupsPerMonth}</p>
              <p className="text-sm">cups</p>
            </div>
            <div className="p-4 rounded-lg bg-background shadow-sm">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Premix Required
              </h4>
              <p className="text-2xl md:text-3xl font-bold">{roundedBags}</p>
              <p className="text-sm">kg per month</p>
            </div>
            <div className="p-4 rounded-lg bg-background shadow-sm">
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Recommended Order
              </h4>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {recommendedBags}
              </p>
              <p className="text-sm">kg (with 20% buffer)</p>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold text-center mb-3">Calculation Details</h4>
            <ul className="space-y-1 break-words text-left text-sm leading-relaxed">
              <li>Beverage Type: {premixType}</li>
              <li>Premix per cup: {gramsPerCup}g</li>
              <li>
                Total monthly usage:{" "}
                {(cupsPerMonth * gramsPerCup).toLocaleString()}g ({roundedBags}
                kg)
              </li>
              <li>Recommended order with buffer: {recommendedBags}kg</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
          <Button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1 w-full sm:w-auto"
            size="sm"
          >
            <MessageCircle className="h-4 w-4" />
            Order via WhatsApp
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1 w-full sm:w-auto"
            size="sm"
            asChild
          >
            <a href="/products?tab=premixes">
              <ShoppingBag className="h-4 w-4" />
              Browse Premixes
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
