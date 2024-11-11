import { FaUserCheck } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import { Area, AreaChart } from "recharts";
import { ChartContainer } from "../ui/chart";
const data = [
  {
    uv: 35,
  },
  {
    uv: 45,
  },
  {
    uv: 38,
  },
  {
    uv: 41,
  },
  {
    uv: 36,
  },
  {
    uv: 43,
  },
  {
    uv: 37,
  },
  {
    uv: 55,
  },
  {
    uv: 40,
  },
];
const chartConfig = {
  newUser: {
    label: "NewUser",
    color: "hsl(219, 100%, 64%)",
  },
  activeOrders: {
    label: "ActiveOrders",
    color: "hsl(138, 56%, 50%)",
  },
  totalSales: {
    label: "TotalSales",
    color: "hsl(31, 90%, 54%)",
  },
  totalProfit: {
    label: "TotalProfit",
    color: "hsl(47, 95%, 54%)",
  },
};

export default function InfoCard() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 w-full h-fit">
      <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-blue-50 flex flex-col gap-y-4">
        <div className="inline-flex gap-x-5 justify-between">
          <div className="inline-flex items-center gap-x-2">
            <div className="size-12 rounded-full bg-[#487FFF] flex items-center justify-center text-white">
              <FaUserCheck size={24} className="ml-2" />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-medium text-[#4B5563]">New Users</p>
              <h6 className="text-2xl font-semibold">15,000</h6>
            </div>
          </div>
          <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
            <ChartContainer config={chartConfig} className="w-[7rem] h-[8rem]">
              <AreaChart accessibilityLayer data={data}>
                <defs>
                  <linearGradient id="fillNewUser" x1="0" y1="" x2="0" y2=".6">
                    <stop
                      offset="5%"
                      stopColor="var(--color-newUser)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-newUser)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="uv"
                  type="natural"
                  fill="url(#fillNewUser)"
                  fillOpacity={0.4}
                  stroke="var(--color-newUser)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
        <p className="text-sm">
          Increase by{" "}
          <span className="bg-green-200 bg-opacity-40 text-[#45B369] font-medium p-1 rounded-md">
            +200
          </span>{" "}
          this week
        </p>
      </div>
      <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-green-50 flex flex-col gap-y-4">
        <div className="inline-flex gap-x-5 justify-between">
          <div className="inline-flex items-center gap-x-2">
            <div className="size-12 rounded-full bg-[#45B369] flex items-center justify-center text-white">
              <BsCartCheckFill size={24} />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-medium text-[#4B5563]">
                Active Orders
              </p>
              <h6 className="text-2xl font-semibold">8,000</h6>
            </div>
          </div>
          <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
            <ChartContainer config={chartConfig} className="w-[7rem] h-[8rem]">
              <AreaChart accessibilityLayer data={data}>
                <defs>
                  <linearGradient
                    id="fillActiveOrders"
                    x1="0"
                    y1=""
                    x2="0"
                    y2=".6"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-activeOrders)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-activeOrders)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="uv"
                  type="natural"
                  fill="url(#fillActiveOrders)"
                  fillOpacity={0.4}
                  stroke="var(--color-activeOrders)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
        <p className="text-sm">
          Increase by{" "}
          <span className="bg-green-200 bg-opacity-40 text-[#45B369] font-medium p-1 rounded-md">
            +200
          </span>{" "}
          this week
        </p>
      </div>
      <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-orange-50 flex flex-col gap-y-4">
        <div className="inline-flex gap-x-5 justify-between">
          <div className="inline-flex items-center gap-x-2">
            <div className="size-12 rounded-full bg-[#F4941E] flex items-center justify-center text-white">
              <RiDiscountPercentFill size={24} />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-medium text-[#4B5563]">Total Sales</p>
              <h6 className="text-2xl font-semibold">$5,00,000</h6>
            </div>
          </div>
          <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
            <ChartContainer config={chartConfig} className="w-[7rem] h-[8rem]">
              <AreaChart accessibilityLayer data={data}>
                <defs>
                  <linearGradient id="fillTotalSales" x1="0" y1="" x2="0" y2=".6">
                    <stop
                      offset="5%"
                      stopColor="var(--color-totalSales)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-totalSales)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="uv"
                  type="natural"
                  fill="url(#fillTotalSales)"
                  fillOpacity={0.4}
                  stroke="var(--color-totalSales)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
        <p className="text-sm">
          Decrease by{" "}
          <span className="bg-[#FDE1E2] text-[#EF4A00] font-medium p-1 rounded-md">
            -$10k
          </span>{" "}
          this week
        </p>
      </div>
      <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-yellow-50 flex flex-col gap-y-4">
        <div className="inline-flex gap-x-5 justify-between">
          <div className="inline-flex items-center gap-x-2">
            <div className="size-12 rounded-full bg-yellow-400 flex items-center justify-center text-white">
              <FaSackDollar size={22} />
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-medium text-[#4B5563]">Total Profit</p>
              <h6 className="text-2xl font-semibold">$3,00,700</h6>
            </div>
          </div>
          <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
            <ChartContainer config={chartConfig} className="w-[7rem] h-[8rem]">
              <AreaChart accessibilityLayer data={data}>
                <defs>
                  <linearGradient id="fillTotalProfit" x1="0" y1="" x2="0" y2=".6">
                    <stop
                      offset="5%"
                      stopColor="var(--color-totalProfit)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-totalProfit)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="uv"
                  type="natural"
                  fill="url(#fillTotalProfit)"
                  fillOpacity={0.4}
                  stroke="var(--color-totalProfit)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
        <p className="text-sm">
          Increase by{" "}
          <span className="bg-green-200 bg-opacity-40 text-[#45B369] font-medium p-1 rounded-md">
            +$15k
          </span>{" "}
          this week
        </p>
      </div>
    </div>
  );
}
