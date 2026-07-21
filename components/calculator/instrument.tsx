"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  PREMIX_TYPES,
  FLAVOUR_CHIP,
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

function fmt(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

export function Instrument() {
  const [premixId, setPremixId] = useState<PremixId>("instant_tea");
  const [cups, setCups] = useState(100);
  const [timeframe, setTimeframe] = useState<Timeframe>("day");

  const premix = PREMIX_TYPES.find((p) => p.id === premixId)!;
  const result = useMemo(
    () => monthlyRequirement(cups, timeframe, premix.gramsPerCup),
    [cups, timeframe, premix.gramsPerCup]
  );

  const cupsPerBag = Math.floor(1000 / premix.gramsPerCup);
  const sliderMax = timeframe === "month" ? 6000 : timeframe === "week" ? 1500 : 600;
  const progress = Math.min(100, (cups / sliderMax) * 100);

  const setCupsClamped = (v: number) =>
    setCups(Math.max(1, Math.min(10000, Math.round(v))));

  const orderMsg = encodeURIComponent(
    `Hi Chocodew, I need about ${result.recommendedKg} kg of ${premix.name} premix per month (${result.monthly} cups). Please share pricing.`
  );

  return (
    <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-xl shadow-primary/5 md:grid-cols-[1.12fr_1fr]">
      {/* Inputs */}
      <div className="p-6 sm:p-9 md:p-11">
        <fieldset>
          <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Beverage
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {PREMIX_TYPES.map((p) => {
              const active = p.id === premixId;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPremixId(p.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.82rem] font-medium transition-all duration-300 sm:px-4",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-primary/15 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: FLAVOUR_CHIP[p.id] }}
                  />
                  {p.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-9">
          <div className="flex items-end justify-between gap-4">
            <label
              htmlFor="cups-input"
              className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            >
              Cups served
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Fewer cups"
                onClick={() => setCupsClamped(cups - 10)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <input
                id="cups-input"
                type="number"
                min={1}
                max={10000}
                value={cups}
                onChange={(e) => setCupsClamped(Number(e.target.value) || 1)}
                className="w-20 border-b border-primary/20 bg-transparent py-1 text-center font-playfair text-3xl font-bold text-primary outline-none transition-colors focus:border-accent"
              />
              <button
                type="button"
                aria-label="More cups"
                onClick={() => setCupsClamped(cups + 10)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
          <input
            type="range"
            aria-label="Cups served"
            min={10}
            max={sliderMax}
            step={10}
            value={Math.min(cups, sliderMax)}
            onChange={(e) => setCupsClamped(Number(e.target.value))}
            className="cd-range mt-6 w-full"
            style={{ ["--range-progress" as string]: `${progress}%` }}
          />
        </div>

        <fieldset className="mt-9">
          <legend className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            How often
          </legend>
          <div className="mt-4 inline-flex rounded-full border border-primary/15 p-1">
            {TIMEFRAMES.map((t) => {
              const active = timeframe === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTimeframe(t.key)}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.82rem] font-medium transition-all duration-300 sm:px-5",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <p className="mt-9 text-[0.82rem] leading-relaxed text-muted-foreground">
          {premix.name} doses at {premix.gramsPerCup} g per cup — about{" "}
          {cupsPerBag} cups from every 1&nbsp;kg bag.
        </p>
      </div>

      {/* Live result */}
      <div
        className="flex flex-col justify-between bg-primary p-6 text-primary-foreground sm:p-9 md:p-11"
        aria-live="polite"
      >
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
            Every month
          </p>
          <div className="mt-6 flex items-baseline gap-3 border-b border-primary-foreground/15 pb-6">
            <span className="font-playfair text-[clamp(2.4rem,4vw,3.4rem)] font-bold leading-none tabular-nums">
              {fmt(result.monthly)}
            </span>
            <span className="text-sm text-primary-foreground/70">cups</span>
          </div>
          <div className="mt-6 flex items-baseline gap-3 border-b border-primary-foreground/15 pb-6">
            <span className="font-playfair text-[clamp(3.2rem,6vw,5rem)] font-bold leading-none tabular-nums text-accent">
              {fmt(result.roundedKg, 1)}
            </span>
            <span className="max-w-[9rem] text-sm leading-snug text-primary-foreground/70">
              kg of premix needed
            </span>
          </div>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-playfair text-[clamp(2rem,3.4vw,2.8rem)] font-bold leading-none tabular-nums">
              {fmt(result.recommendedKg)}
            </span>
            <span className="max-w-[11rem] text-sm leading-snug text-primary-foreground/70">
              kg recommended order (20% buffer)
            </span>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3">
          <a
            href={`https://wa.me/${WA}?text=${orderMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.9rem] font-medium text-primary transition-colors duration-300 hover:bg-accent/90"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            Order this on WhatsApp
          </a>
          <Link
            href="/products?tab=premixes"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3.5 text-[0.9rem] font-medium text-primary-foreground transition-colors duration-300 hover:border-primary-foreground/60"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            Browse premixes
          </Link>
        </div>
      </div>
    </div>
  );
}
