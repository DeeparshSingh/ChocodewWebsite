/**
 * Calculator domain data — dose per cup for every vendable premix.
 * (1 kg bag ÷ gramsPerCup = cups per bag.) Preserved from the original
 * calculator so the numbers stay identical.
 */
export const PREMIX_TYPES = [
  { id: "instant_tea", name: "Instant Tea", gramsPerCup: 14.29 },
  { id: "cardamom_tea", name: "Cardamom Tea", gramsPerCup: 14.29 },
  { id: "instant_masala_tea", name: "Masala Tea", gramsPerCup: 14.29 },
  { id: "cappuccino_coffee", name: "Cappuccino Coffee", gramsPerCup: 14.29 },
  { id: "lemon_tea", name: "Lemon Tea", gramsPerCup: 12.5 },
  { id: "without_sugar_coffee", name: "Coffee · No Sugar", gramsPerCup: 12.5 },
  {
    id: "without_sugar_cappuccino_coffee",
    name: "Cappuccino · No Sugar",
    gramsPerCup: 12.5,
  },
  {
    id: "without_sugar_cardamom_tea",
    name: "Cardamom Tea · No Sugar",
    gramsPerCup: 12.5,
  },
  { id: "tomato_soup", name: "Tomato Soup", gramsPerCup: 7.69 },
  { id: "sweet_corn_soup", name: "Sweet Corn Soup", gramsPerCup: 7.69 },
] as const;

export type PremixId = (typeof PREMIX_TYPES)[number]["id"];
export type Timeframe = "day" | "week" | "month";

export const FLAVOUR_CHIP: Record<PremixId, string> = {
  instant_tea: "#a9803f",
  cardamom_tea: "#6f7d43",
  instant_masala_tea: "#a9803f",
  cappuccino_coffee: "#7a4a28",
  lemon_tea: "#c9a227",
  without_sugar_coffee: "#5a3a22",
  without_sugar_cappuccino_coffee: "#7a4a28",
  without_sugar_cardamom_tea: "#6f7d43",
  tomato_soup: "#b4462f",
  sweet_corn_soup: "#c99a30",
};

export function cupsPerMonth(cups: number, timeframe: Timeframe) {
  if (timeframe === "day") return cups * 30;
  if (timeframe === "week") return cups * 4;
  return cups;
}

/** Monthly requirement in kg, plus the recommended order with a 20% buffer. */
export function monthlyRequirement(
  cups: number,
  timeframe: Timeframe,
  gramsPerCup: number
) {
  const monthly = cupsPerMonth(cups, timeframe);
  const kg = (monthly * gramsPerCup) / 1000;
  const roundedKg = Math.ceil(kg * 10) / 10;
  const recommendedKg = Math.ceil(roundedKg * 1.2);
  return { monthly, kg, roundedKg, recommendedKg };
}
