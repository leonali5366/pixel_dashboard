import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { day: "Mon", netProfit: 186, revenue: 80, freeCase: 90 },
  { day: "Tue", netProfit: 305, revenue: 200, freeCase: 90 },
  { day: "Wed", netProfit: 237, revenue: 120, freeCase: 90 },
  { day: "Thu", netProfit: 73, revenue: 190, freeCase: 90 },
  { day: "Fri", netProfit: 209, revenue: 130, freeCase: 90 },
  { day: "Sat", netProfit: 214, revenue: 140, freeCase: 90 },
  { day: "Sun", netProfit: 214, revenue: 140, freeCase: 90 },
];

const chartConfig = {
  netProfit: {
    label: "Net Profit",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
  freeCase: {
    label: "Free Case",
    color: "hsl(var(--chart-3))",
  },
};

export default function PaymentStatus() {
  return (
    <Card className="w-full">
      <CardHeader>
        <span className="text-lg font-bold">Client Payment Status</span>
        <CardDescription>Weekly Report</CardDescription>
      </CardHeader>
      <div className="w-full inline-flex items-center justify-center gap-x-5">
        <div className="inline-flex items-center gap-x-2">
          <div className="size-3 rounded-full bg-green-500" />
          <span className="text-[#4B5563] text-sm font-medium">Total: 500</span>
        </div>
        <div className="inline-flex items-center gap-x-2">
          <div className="size-3 rounded-full bg-orange-500" />
          <span className="text-[#4B5563] text-sm font-medium">New: 570</span>
        </div>
        <div className="inline-flex items-center gap-x-2">
          <div className="size-3 rounded-full bg-blue-500" />
          <span className="text-[#4B5563] text-sm font-medium">
            Active: 1500
          </span>
        </div>
      </div>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="netProfit" fill="var(--color-netProfit)" radius={4} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="freeCase" fill="var(--color-freeCase)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
