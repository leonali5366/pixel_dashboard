import { FaFileCode } from "react-icons/fa6";
import { PiSoundcloudLogoFill } from "react-icons/pi";
import { SiGooglecontaineroptimizedos } from "react-icons/si";
import { FaFilePen } from "react-icons/fa6";
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
  development: {
    label: "Development",
    color: "hsl(174, 79%, 45%)",
  },
  hosting: {
    label: "Hosting",
    color: "hsl(0, 85%, 58%)",
  },
  seo: {
    label: "SEO",
    color: "hsl(262, 92%, 64%)",
  },
  ppc: {
    label: "PPC",
    color: "hsl(336, 81%, 58%)",
  },
};

export default function ActiveOrders() {
  return (
    <div className="w-full flex flex-col gap-y-3">
      <span className="text-xl font-semibold">Active Orders</span>
      <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-teal-100 flex flex-col gap-y-4">
          <div className="inline-flex gap-x-5 justify-between">
            <div className="inline-flex items-center gap-x-2">
              <div className="size-12 rounded-full bg-teal-500 flex items-center justify-center text-white">
                <FaFileCode size={24} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#4B5563]">
                  Development
                </p>
                <h6 className="text-2xl font-semibold">15,000</h6>
              </div>
            </div>
            <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
              <ChartContainer
                config={chartConfig}
                className="w-[7rem] h-[8rem]"
              >
                <AreaChart accessibilityLayer data={data}>
                  <defs>
                    <linearGradient
                      id="fillDevelopment"
                      x1="0"
                      y1=""
                      x2="0"
                      y2=".6"
                    >
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
                  </defs>
                  <Area
                    dataKey="uv"
                    type="natural"
                    fill="url(#fillDevelopment)"
                    fillOpacity={0.4}
                    stroke="var(--color-development)"
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
        <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-red-100 flex flex-col gap-y-4">
          <div className="inline-flex gap-x-5 justify-between">
            <div className="inline-flex items-center gap-x-2">
              <div className="size-12 rounded-full bg-red-500 flex items-center justify-center text-white">
                <PiSoundcloudLogoFill size={24} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#4B5563]">Hosting</p>
                <h6 className="text-2xl font-semibold">15,000</h6>
              </div>
            </div>
            <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
              <ChartContainer
                config={chartConfig}
                className="w-[7rem] h-[8rem]"
              >
                <AreaChart accessibilityLayer data={data}>
                  <defs>
                    <linearGradient
                      id="fillHosting"
                      x1="0"
                      y1=""
                      x2="0"
                      y2=".6"
                    >
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
                  </defs>
                  <Area
                    dataKey="uv"
                    type="natural"
                    fill="url(#fillHosting)"
                    fillOpacity={0.4}
                    stroke="var(--color-hosting)"
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
        <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-purple-100 flex flex-col gap-y-4">
          <div className="inline-flex gap-x-5 justify-between">
            <div className="inline-flex items-center gap-x-2">
              <div className="size-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                <SiGooglecontaineroptimizedos size={24} />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#4B5563]">SEO</p>
                <h6 className="text-2xl font-semibold">15,000</h6>
              </div>
            </div>
            <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
              <ChartContainer
                config={chartConfig}
                className="w-[7rem] h-[8rem]"
              >
                <AreaChart accessibilityLayer data={data}>
                  <defs>
                    <linearGradient id="fillSEO" x1="0" y1="" x2="0" y2=".6">
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
                  </defs>
                  <Area
                    dataKey="uv"
                    type="natural"
                    fill="url(#fillSEO)"
                    fillOpacity={0.4}
                    stroke="var(--color-seo)"
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
        <div className="border border-slate-300 p-4 rounded-md bg-gradient-to-r from-white to-pink-100 flex flex-col gap-y-4">
          <div className="inline-flex gap-x-5 justify-between">
            <div className="inline-flex items-center gap-x-2">
              <div className="size-12 rounded-full bg-pink-500 flex items-center justify-center text-white">
                <FaFilePen size={24} className="ml-2" />
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium text-[#4B5563]">PPC</p>
                <h6 className="text-2xl font-semibold">15,000</h6>
              </div>
            </div>
            <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
              <ChartContainer
                config={chartConfig}
                className="w-[7rem] h-[8rem]"
              >
                <AreaChart accessibilityLayer data={data}>
                  <defs>
                    <linearGradient id="fillPPC" x1="0" y1="" x2="0" y2=".6">
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
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="uv"
                    type="natural"
                    fill="url(#fillPPC)"
                    fillOpacity={0.4}
                    stroke="var(--color-ppc)"
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
      </div>
    </div>
  );
}
