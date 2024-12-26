"use client";

import { Bar, BarChart, CartesianGrid } from "recharts";

import { ChartContainer } from "@/components/ui/chart";
const chartData = [
  { month: "January", orders: 186 },
  { month: "February", orders: 305 },
  { month: "March", orders: 237 },
  { month: "April", orders: 73 },
  { month: "May", orders: 209 },
  { month: "June", orders: 214 },
  { month: "July", orders: 100 },
  { month: "August", orders: 150 },
  { month: "September", orders: 200 },
  { month: "October", orders: 164 },
  { month: "November", orders: 178 },
  { month: "Decembar", orders: 88 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="h-[120px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} horizontal={false} />

        <Bar dataKey="orders" fill="var(--color-desktop)" radius={3} />
      </BarChart>
    </ChartContainer>
  );
}
