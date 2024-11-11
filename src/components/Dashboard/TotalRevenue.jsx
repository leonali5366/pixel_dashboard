import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "An area chart with gradient fill";
const chartData = [
  { month: "January", desktop: 20 },
  { month: "February", desktop: 50 },
  { month: "March", desktop: 40 },
  { month: "April", desktop: 70 },
  { month: "May", desktop: 60 },
  { month: "June", desktop: 80 },
  { month: "July", desktop: 70 },
  { month: "August", desktop: 90 },
  { month: "September", desktop: 80 },
  { month: "October", desktop: 100 },
  { month: "November", desktop: 90 },
  { month: "December", desktop: 110 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};
export default function TotalRevenue() {
  return (
    <Card className="h-[20rem]">
      <CardHeader>
        <div className="w-full inline-flex justify-between">
          <div className="flex flex-col items-start">
            <span className="text-lg font-bold">Revenue Growth</span>
            <span className="text-sm font-medium text-[#4B5563]">Weekly Report</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold">$50,000.00</span>
            <span className="text-sm font-medium py-1 px-3 bg-green-200 bg-opacity-40 text-[#45B369] rounded-lg">
              $10k
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[12rem]">
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
