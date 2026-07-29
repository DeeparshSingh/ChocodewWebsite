"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bean,
  CalendarDays,
  Coffee,
  Calculator as CalculatorIcon,
  MessageCircle,
  ShoppingBag,
  CupSoda,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PREMIX_TYPES,
  type PremixId,
  type Timeframe,
  monthlyRequirement,
} from "@/lib/premixes";

const TIMEFRAMES: { key: Timeframe; label: string }[] = [
  { key: "day", label: "Per day" },
  { key: "week", label: "Per week" },
  { key: "month", label: "Per month" },
];

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876333111";
const EASE = [0.16, 1, 0.3, 1] as const;

interface Result {
  monthly: number;
  roundedKg: number;
  recommendedKg: number;
  premixName: string;
  gramsPerCup: number;
}

function fmt(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function CalculatorCard() {
  const [premixId, setPremixId] = useState<PremixId>("instant_tea");
  const [cups, setCups] = useState<number>(100);
  const [timeframe, setTimeframe] = useState<Timeframe>("day");
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const premix = PREMIX_TYPES.find((p) => p.id === premixId)!;
  const cupsPerBag = Math.floor(1000 / premix.gramsPerCup);

  const calculate = () => {
    const safeCups = Math.max(1, Math.min(10000, Math.round(cups) || 1));
    setCups(safeCups);
    const r = monthlyRequirement(safeCups, timeframe, premix.gramsPerCup);
    setResult({
      monthly: r.monthly,
      roundedKg: r.roundedKg,
      recommendedKg: r.recommendedKg,
      premixName: premix.name,
      gramsPerCup: premix.gramsPerCup,
    });
    // on small screens bring the result into view gently
    requestAnimationFrame(() => {
      if (window.innerWidth < 768) {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  };

  const orderMsg = result
    ? encodeURIComponent(
        `Hi Chocodew, I need about ${result.recommendedKg} kg of ${result.premixName} premix per month (${result.monthly} cups). Please share pricing.`
      )
    : "";

  return (
    <Card className="overflow-visible rounded-3xl border-primary/10 shadow-xl shadow-primary/5">
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        {/* Form */}
        <div>
          <CardHeader className="p-6 pb-2 sm:p-9 sm:pb-3 md:p-10 md:pb-3">
            <CardTitle className="font-playfair text-2xl text-primary md:text-3xl">
              Calculate your premix requirements
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Three quick choices and the estimate is ready.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-7 p-6 pt-5 sm:p-9 sm:pt-6 md:p-10 md:pt-6">
            <div className="space-y-2.5">
              <Label
                htmlFor="beverage"
                className="flex items-center gap-1.5 text-sm font-medium"
              >
                <Bean className="h-4 w-4 text-accent" />
                Beverage Type
              </Label>
              <Select
                value={premixId}
                onValueChange={(v) => setPremixId(v as PremixId)}
              >
                <SelectTrigger
                  id="beverage"
                  className="h-12 rounded-xl border-primary/15 bg-background text-[0.95rem] focus:ring-accent"
                >
                  <SelectValue placeholder="Select beverage type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {PREMIX_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {premix.name} doses at {premix.gramsPerCup} g per cup, about{" "}
                {cupsPerBag} cups from every 1 kg bag.
              </p>
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="cups"
                className="flex items-center gap-1.5 text-sm font-medium"
              >
                <Coffee className="h-4 w-4 text-accent" />
                Number of Cups
              </Label>
              <Input
                id="cups"
                type="number"
                min={1}
                max={10000}
                value={Number.isNaN(cups) ? "" : cups}
                onChange={(e) => setCups(parseInt(e.target.value, 10))}
                className="h-12 rounded-xl border-primary/15 bg-background text-[0.95rem] focus-visible:ring-accent"
              />
            </div>

            <div className="space-y-2.5">
              <Label className="flex items-center gap-1.5 text-sm font-medium">
                <CalendarDays className="h-4 w-4 text-accent" />
                Time Period
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {TIMEFRAMES.map((t) => {
                  const active = timeframe === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTimeframe(t.key)}
                      className={cn(
                        "h-11 rounded-xl border text-sm font-medium transition-all duration-300",
                        active
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-primary/15 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={calculate}
              size="lg"
              className="w-full rounded-full text-base"
            >
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Calculate
            </Button>
          </CardContent>
        </div>

        {/* Results panel */}
        <div
          ref={resultRef}
          className="scroll-mt-24 border-t border-primary/10 bg-neutral-50/80 md:border-l md:border-t-0"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex h-full flex-col justify-between p-6 sm:p-9 md:p-10"
              >
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Your monthly estimate
                  </p>

                  <div className="mt-5 flex items-baseline gap-2 border-b border-primary/10 pb-5">
                    <span className="font-playfair text-4xl font-bold tabular-nums text-primary md:text-5xl">
                      {fmt(result.monthly)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      cups per month
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-2 border-b border-primary/10 pb-5">
                    <span className="font-playfair text-5xl font-bold tabular-nums text-accent md:text-6xl">
                      {fmt(result.roundedKg, 1)}
                    </span>
                    <span className="max-w-[9rem] text-sm leading-snug text-muted-foreground">
                      kg of premix needed
                    </span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-playfair text-3xl font-bold tabular-nums text-primary md:text-4xl">
                      {fmt(result.recommendedKg)}
                    </span>
                    <span className="max-w-[12rem] text-sm leading-snug text-muted-foreground">
                      kg recommended order, with a 20% buffer
                    </span>
                  </div>

                  <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                    {result.premixName} · {result.gramsPerCup} g per cup ·{" "}
                    {fmt(result.monthly * result.gramsPerCup)} g total each month
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <a
                      href={`https://wa.me/${WA}?text=${orderMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Order this on WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full"
                  >
                    <Link href="/products?tab=premixes">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Browse premixes
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-4 p-8 text-center md:min-h-0"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <CupSoda className="h-7 w-7 text-accent" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-playfair text-lg font-semibold text-primary">
                    Your estimate appears here
                  </p>
                  <p className="mx-auto mt-1.5 max-w-[16rem] text-sm text-muted-foreground">
                    Pick a beverage, set your cups, and hit Calculate.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
