import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
} from "@/components/ui/select";

import { BiSolidCart } from "react-icons/bi";
// import { MdInsertChart } from "react-icons/md";
// import { ImArrowUp } from "react-icons/im";

const chartData = [
  { date: "2024-09-01", sales: 222, hosting: 150, seo: 222, ppc: 121 },
  { date: "2024-09-02", sales: 97, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-09-03", sales: 167, hosting: 120, seo: 222, ppc: 121 },
  { date: "2024-09-04", sales: 242, hosting: 260, seo: 222, ppc: 121 },
  { date: "2024-09-05", sales: 373, hosting: 290, seo: 222, ppc: 121 },
  { date: "2024-09-06", sales: 301, hosting: 340, seo: 222, ppc: 121 },
  { date: "2024-09-07", sales: 245, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-09-08", sales: 409, hosting: 320, seo: 222, ppc: 121 },
  { date: "2024-09-09", sales: 59, hosting: 110, seo: 222, ppc: 121 },
  { date: "2024-09-10", sales: 261, hosting: 190, seo: 222, ppc: 121 },
  { date: "2024-09-11", sales: 327, hosting: 350, seo: 222, ppc: 121 },
  { date: "2024-09-12", sales: 292, hosting: 210, seo: 222, ppc: 121 },
  { date: "2024-09-13", sales: 342, hosting: 380, seo: 222, ppc: 121 },
  { date: "2024-09-14", sales: 137, hosting: 220, seo: 222, ppc: 121 },
  { date: "2024-09-15", sales: 120, hosting: 170, seo: 222, ppc: 121 },
  { date: "2024-09-16", sales: 138, hosting: 190, seo: 222, ppc: 121 },
  { date: "2024-09-17", sales: 446, hosting: 360, seo: 222, ppc: 121 },
  { date: "2024-09-18", sales: 364, hosting: 410, seo: 222, ppc: 121 },
  { date: "2024-09-19", sales: 243, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-09-20", sales: 89, hosting: 150, seo: 222, ppc: 121 },
  { date: "2024-09-21", sales: 137, hosting: 200, seo: 222, ppc: 121 },
  { date: "2024-09-22", sales: 224, hosting: 170, seo: 222, ppc: 121 },
  { date: "2024-09-23", sales: 138, hosting: 230, seo: 222, ppc: 121 },
  { date: "2024-09-24", sales: 387, hosting: 290, seo: 222, ppc: 121 },
  { date: "2024-09-25", sales: 215, hosting: 250, seo: 222, ppc: 121 },
  { date: "2024-09-26", sales: 75, hosting: 130, seo: 222, ppc: 121 },
  { date: "2024-09-27", sales: 383, hosting: 420, seo: 222, ppc: 121 },
  { date: "2024-09-28", sales: 122, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-09-29", sales: 315, hosting: 240, seo: 222, ppc: 121 },
  { date: "2024-09-30", sales: 454, hosting: 380, seo: 222, ppc: 121 },
  { date: "2024-10-01", sales: 165, hosting: 220, seo: 222, ppc: 121 },
  { date: "2024-10-02", sales: 293, hosting: 310, seo: 222, ppc: 121 },
  { date: "2024-10-03", sales: 247, hosting: 190, seo: 222, ppc: 121 },
  { date: "2024-10-04", sales: 385, hosting: 420, seo: 222, ppc: 121 },
  { date: "2024-10-05", sales: 481, hosting: 390, seo: 222, ppc: 121 },
  { date: "2024-10-06", sales: 498, hosting: 520, seo: 222, ppc: 121 },
  { date: "2024-10-07", sales: 388, hosting: 300, seo: 222, ppc: 121 },
  { date: "2024-10-08", sales: 149, hosting: 210, seo: 222, ppc: 121 },
  { date: "2024-10-09", sales: 227, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-10-10", sales: 293, hosting: 330, seo: 222, ppc: 121 },
  { date: "2024-10-11", sales: 335, hosting: 270, seo: 222, ppc: 121 },
  { date: "2024-10-12", sales: 197, hosting: 240, seo: 222, ppc: 121 },
  { date: "2024-10-13", sales: 197, hosting: 160, seo: 222, ppc: 121 },
  { date: "2024-10-14", sales: 448, hosting: 490, seo: 222, ppc: 121 },
  { date: "2024-10-15", sales: 473, hosting: 380, seo: 222, ppc: 121 },
  { date: "2024-10-16", sales: 338, hosting: 400, seo: 222, ppc: 121 },
  { date: "2024-10-17", sales: 499, hosting: 420, seo: 222, ppc: 121 },
  { date: "2024-10-18", sales: 315, hosting: 350, seo: 222, ppc: 121 },
  { date: "2024-10-19", sales: 235, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-10-20", sales: 177, hosting: 230, seo: 222, ppc: 121 },
  { date: "2024-10-21", sales: 82, hosting: 140, seo: 222, ppc: 121 },
  { date: "2024-10-22", sales: 81, hosting: 120, seo: 222, ppc: 121 },
  { date: "2024-10-23", sales: 252, hosting: 290, seo: 222, ppc: 121 },
  { date: "2024-10-24", sales: 294, hosting: 220, seo: 222, ppc: 121 },
  { date: "2024-10-25", sales: 201, hosting: 250, seo: 222, ppc: 121 },
  { date: "2024-10-26", sales: 213, hosting: 170, seo: 222, ppc: 121 },
  { date: "2024-10-27", sales: 420, hosting: 460, seo: 222, ppc: 121 },
  { date: "2024-10-28", sales: 233, hosting: 190, seo: 222, ppc: 121 },
  { date: "2024-10-29", sales: 78, hosting: 130, seo: 222, ppc: 121 },
  { date: "2024-10-30", sales: 340, hosting: 280, seo: 222, ppc: 121 },
  { date: "2024-10-31", sales: 178, hosting: 230, seo: 222, ppc: 121 },
  { date: "2024-11-01", sales: 178, hosting: 200, seo: 222, ppc: 121 },
  { date: "2024-11-02", sales: 470, hosting: 410, seo: 222, ppc: 121 },
  { date: "2024-11-03", sales: 103, hosting: 160, seo: 222, ppc: 121 },
  { date: "2024-11-04", sales: 439, hosting: 380, seo: 222, ppc: 121 },
  { date: "2024-11-05", sales: 88, hosting: 140, seo: 222, ppc: 121 },
  { date: "2024-11-06", sales: 294, hosting: 250, seo: 222, ppc: 121 },
  { date: "2024-11-07", sales: 323, hosting: 370, seo: 222, ppc: 121 },
  { date: "2024-11-08", sales: 385, hosting: 320, seo: 222, ppc: 121 },
  { date: "2024-11-09", sales: 438, hosting: 480, seo: 222, ppc: 121 },
  { date: "2024-11-10", sales: 155, hosting: 200, seo: 222, ppc: 121 },
  { date: "2024-11-11", sales: 92, hosting: 150, seo: 222, ppc: 121 },
  { date: "2024-11-12", sales: 492, hosting: 420, seo: 222, ppc: 121 },
  { date: "2024-11-13", sales: 81, hosting: 130, seo: 222, ppc: 121 },
  { date: "2024-11-14", sales: 426, hosting: 380, seo: 222, ppc: 121 },
  { date: "2024-11-15", sales: 307, hosting: 350, seo: 222, ppc: 121 },
  { date: "2024-11-16", sales: 371, hosting: 310, seo: 222, ppc: 121 },
  { date: "2024-11-17", sales: 475, hosting: 520, seo: 222, ppc: 121 },
  { date: "2024-11-18", sales: 107, hosting: 170, seo: 222, ppc: 121 },
  { date: "2024-11-19", sales: 341, hosting: 290, seo: 222, ppc: 121 },
  { date: "2024-11-20", sales: 408, hosting: 450, seo: 222, ppc: 121 },
  { date: "2024-11-21", sales: 169, hosting: 210, seo: 222, ppc: 121 },
  { date: "2024-11-22", sales: 317, hosting: 270, seo: 222, ppc: 121 },
  { date: "2024-11-23", sales: 480, hosting: 530, seo: 222, ppc: 121 },
  { date: "2024-11-24", sales: 132, hosting: 180, seo: 222, ppc: 121 },
  { date: "2024-11-25", sales: 141, hosting: 190, seo: 222, ppc: 121 },
  { date: "2024-11-26", sales: 434, hosting: 380, seo: 222, ppc: 121 },
  { date: "2024-11-27", sales: 448, hosting: 490, seo: 222, ppc: 121 },
  { date: "2024-11-28", sales: 149, hosting: 200, seo: 222, ppc: 121 },
  { date: "2024-11-29", sales: 103, hosting: 160, seo: 222, ppc: 121 },
  { date: "2024-11-30", sales: 446, hosting: 400, seo: 222, ppc: 121 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(219, 100%, 64%)",
  },
  // development: {
  //   label: "Development",
  //   color: "hsl(174, 79%, 45%)",
  // },
  // hosting: {
  //   label: "Hosting",
  //   color: "hsl(0, 85%, 58%)",
  // },
  // seo: {
  //   label: "SEO",
  //   color: "hsl(262, 92%, 64%)",
  // },
  // ppc: {
  //   label: "PPC",
  //   color: "hsl(336, 81%, 58%)",
  // },
};

export function Statistics() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Total Sales</CardTitle>
          <CardDescription>
            Showing total sales for the last 3 months
          </CardDescription>
        </div>
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
      </CardHeader>
      <div className="w-full inline-flex items-center justify-center gap-x-5">
        <div className="border rounded-lg p-[2px] inline-flex items-end gap-x-2 pr-8 group hover:border-blue-500 transition-all duration-500">
          <div className="size-[3rem] rounded-lg bg-[#F3F4F6] flex items-center justify-center group-hover:bg-blue-500 transition-all duration-500">
            <BiSolidCart
              size={24}
              className="text-[#4B5563] group-hover:text-white transition-all duration-1000"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#4B5563]">Sales</span>
            <span className="font-semibold">$200k</span>
          </div>
        </div>
        {/* <div className="border rounded-lg p-[2px] inline-flex items-end gap-x-2 pr-8 group hover:border-blue-500 transition-all duration-500">
          <div className="size-[3rem] rounded-lg bg-[#F3F4F6] flex items-center justify-center group-hover:bg-blue-500 transition-all duration-500">
            <MdInsertChart
              size={25}
              className="text-[#4B5563] group-hover:text-white transition-all duration-1000"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#4B5563]">Income</span>
            <span className="font-semibold">$200k</span>
          </div>
        </div>
        <div className="border rounded-lg p-[2px] inline-flex items-end gap-x-2 pr-8 group hover:border-blue-500 transition-all duration-500">
          <div className="size-[3rem] rounded-lg bg-[#F3F4F6] flex items-center justify-center group-hover:bg-blue-500 transition-all duration-500">
            <ImArrowUp
              size={22}
              className="text-[#4B5563] group-hover:text-white transition-all duration-1000"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#4B5563]">Profit</span>
            <span className="font-semibold">$200k</span>
          </div>
        </div> */}
      </div>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              {/* <linearGradient id="fillDevelopment" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-development)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-development)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillHosting" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-hosting)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-hosting)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSEO" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-seo)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-seo)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPPC" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ppc)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ppc)"
                  stopOpacity={0.1}
                />
              </linearGradient> */}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-sales)"
              stackId="a"
            />
            {/* <Area
              dataKey="development"
              type="natural"
              fill="url(#fillDevelopment)"
              stroke="var(--color-development)"
              stackId="a"
            />
            <Area
              dataKey="hosting"
              type="natural"
              fill="url(#fillHosting)"
              stroke="var(--color-hosting)"
              stackId="a"
            />
            <Area
              dataKey="seo"
              type="natural"
              fill="url(#fillSEO)"
              stroke="var(--color-seo)"
              stackId="a"
            />
            <Area
              dataKey="ppc"
              type="natural"
              fill="url(#fillPPC)"
              stroke="var(--color-ppc)"
              stackId="a"
            /> */}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
