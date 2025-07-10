"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, Coffee, CalendarDays, Bean } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CalculatorResult } from "@/components/calculator/calculator-result";

// ---- UPDATED BEVERAGE OPTIONS FOR YOUR BUSINESS ----
// Each 1 kg bag yields a fixed number of cups; gramsPerCup is still used internally
const PREMIX_TYPES = [
  { id: "instant_tea", name: "Instant Tea", gramsPerCup: 14.29 },                  
  { id: "cardamom_tea", name: "Cardamom Tea", gramsPerCup: 14.29 },                
  { id: "instant_masala_tea", name: "Instant Masala Tea", gramsPerCup: 14.29 },    
  { id: "cappuccino_coffee", name: "Cappuccino Coffee", gramsPerCup: 14.29 },      
  { id: "lemon_tea", name: "Lemon Tea", gramsPerCup: 12.5 },                       
  { id: "without_sugar_coffee", name: "Without Sugar Coffee", gramsPerCup: 12.5 }, 
  {
    id: "without_sugar_cappuccino_coffee",
    name: "Without Sugar Cappuccino Coffee",
    gramsPerCup: 12.5,                                                             
  },
  {
    id: "without_sugar_cardamom_tea",
    name: "Without Sugar Cardamom Tea",
    gramsPerCup: 12.5,                                                             
  },
  { id: "tomato_soup", name: "Tomato Soup", gramsPerCup: 7.69 },                   
  { id: "sweet_corn_soup", name: "Sweet Corn Soup", gramsPerCup: 7.69 },           
];

const formSchema = z.object({
  cups: z
    .coerce.number()
    .min(1, "Please enter at least 1 cup")
    .max(10000, "Value too large"),
  timeframe: z.enum(["day", "week", "month"]),
  premixType: z.enum([
    "instant_tea",
    "cardamom_tea",
    "instant_masala_tea",
    "cappuccino_coffee",
    "lemon_tea",
    "without_sugar_coffee",
    "without_sugar_cappuccino_coffee",
    "without_sugar_cardamom_tea",
    "tomato_soup",
    "sweet_corn_soup",
  ]),
});

type FormValues = z.infer<typeof formSchema>;

export function CalculatorForm() {
  const [result, setResult] = useState<{
    bagsPerMonth: number;
    cupsPerMonth: number;
    premixType: string;
    gramsPerCup: number;
  } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      // Fine-tune scroll on narrow screens (mobile)
      if (window.innerWidth < 640) {
        // Negative value moves view slightly back up; tweak as needed
        window.scrollBy({ top: 550, behavior: 'smooth' });
      }
    }
  }, [result]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cups: 100,
      timeframe: "day",
      premixType: "instant_tea",
    },
  });

  const onSubmit = (data: FormValues) => {
    const selectedPremix = PREMIX_TYPES.find(
      (type) => type.id === data.premixType
    );
    const gramsPerCup = selectedPremix?.gramsPerCup || 0;

    let cupsPerMonth = data.cups;
    if (data.timeframe === "day") {
      cupsPerMonth = data.cups * 30;
    } else if (data.timeframe === "week") {
      cupsPerMonth = data.cups * 4;
    }

    const totalGrams = cupsPerMonth * gramsPerCup;
    const bagsPerMonth = totalGrams / 1000;

    setResult({
      bagsPerMonth,
      cupsPerMonth,
      premixType: selectedPremix?.name || "",
      gramsPerCup,
    });
  };

  return (
    <div className="w-full max-w-[18rem] sm:max-w-lg mx-auto space-y-8">
      <Card className="w-full border">
        <CardHeader className="text-center space-y-2">
          <CardTitle>
            
            Calculate Your Premix Requirements
          </CardTitle>
          <CardDescription>
            Fill in the form below to estimate how much premix you will need.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* 1. Beverage Type */}
              <FormField
                control={form.control}
                name="premixType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Bean className="h-4 w-4 text-muted-foreground" />
                      Beverage Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select beverage type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PREMIX_TYPES.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Different beverages yield different cups per 1 kg bag.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. Number of Cups */}
              <FormField
                control={form.control}
                name="cups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1.5">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      Number of Cups
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={1} />
                    </FormControl>
                    <FormDescription>How many cups do you serve?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 3. Time Period */}
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      Time Period
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4 justify-center"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="day" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Per Day
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="week" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Per Week
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="month" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            Per Month
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <CalculatorResult
              bagsPerMonth={result.bagsPerMonth}
              cupsPerMonth={result.cupsPerMonth}
              premixType={result.premixType}
              gramsPerCup={result.gramsPerCup}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
