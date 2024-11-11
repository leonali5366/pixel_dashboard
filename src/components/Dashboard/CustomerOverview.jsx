import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
export const description = "A radial chart with stacked sections";
const chartData = [{ month: "january", total: 500, new: 570, active: 1500 }];
const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  new: {
    label: "New",
    color: "hsl(var(--chart-2))",
  },
  active: {
    label: "Active",
    color: "hsl(var(--chart-3))",
  },
};
export default function CustomerOverview() {
  const [timeRange, setTimeRange] = useState("90d");
  const totalVisitors =
    chartData[0].total + chartData[0].new + chartData[0].active;
  return (
    <Card className="flex flex-col p-5 gap-y-5">
      <div className="w-full inline-flex items-center justify-between">
        <h1 className="text-lg font-bold">Customer Overview</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full inline-flex items-center justify-between">
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
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Customer Report
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="active"
              fill="hsl(217.22,91.22%,59.8%)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="total"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-total)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="new"
              fill="var(--color-new)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
