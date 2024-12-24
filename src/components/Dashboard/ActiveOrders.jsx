import { FaFileCode, FaFilePen } from "react-icons/fa6";
import { PiSoundcloudLogoFill } from "react-icons/pi";
import { SiGooglecontaineroptimizedos } from "react-icons/si";
import { Area, AreaChart } from "recharts";
import { ChartContainer } from "../ui/chart";
import { useEffect, useState } from "react";

// Static chart data
const data = [
  { uv: 35 },
  { uv: 45 },
  { uv: 38 },
  { uv: 41 },
  { uv: 36 },
  { uv: 43 },
  { uv: 37 },
  { uv: 55 },
  { uv: 40 },
];

const chartConfig = {
  development: { label: "Development", color: "hsl(174, 79%, 45%)" },
  hosting: { label: "Hosting", color: "hsl(0, 85%, 58%)" },
  seo: { label: "SEO", color: "hsl(262, 92%, 64%)" },
  ppc: { label: "PPC", color: "hsl(336, 81%, 58%)" },
};

export default function ActiveOrders() {
  const [orders, setOrders] = useState({
    development: [],
    hosting: [],
    seo: [],
    ppc: [],
  });

  // Fetching data dynamically
  const fetchOrders = (service) => {
    fetch(`http://localhost:5000/api/v1/order/get/orderByService?service=${service}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setOrders((prev) => ({ ...prev, [service]: data.data }));
        }
      })
      .catch((error) => console.error(`Error fetching ${service} orders:`, error));
  };

  useEffect(() => {
    ["development", "hosting", "seo", "ppc"].forEach(fetchOrders);
  }, []);

  const serviceCards = [
    {
      id: "development",
      title: "Development",
      icon: <FaFileCode size={24} />,
      bgColor: "bg-teal-500",
      gradient: "bg-gradient-to-r from-white to-teal-100",
    },
    {
      id: "hosting",
      title: "Hosting",
      icon: <PiSoundcloudLogoFill size={24} />,
      bgColor: "bg-red-500",
      gradient: "bg-gradient-to-r from-white to-red-100",
    },
    {
      id: "seo",
      title: "SEO",
      icon: <SiGooglecontaineroptimizedos size={24} />,
      bgColor: "bg-purple-500",
      gradient: "bg-gradient-to-r from-white to-purple-100",
    },
    {
      id: "ppc",
      title: "PPC",
      icon: <FaFilePen size={24} />,
      bgColor: "bg-pink-500",
      gradient: "bg-gradient-to-r from-white to-pink-100",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-y-3">
      <span className="text-xl font-semibold">Active Orders</span>
      <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {serviceCards.map((service) => (
          <div
            key={service.id}
            className={`border border-slate-300 p-4 rounded-md ${service.gradient} flex flex-col gap-y-4`}
          >
            <div className="inline-flex gap-x-5 justify-between">
              <div className="inline-flex items-center gap-x-2">
                <div
                  className={`size-12 rounded-full ${service.bgColor} flex items-center justify-center text-white`}
                >
                  {service.icon}
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-sm font-medium text-[#4B5563]">
                    {service.title}
                  </p>
                  <h6 className="text-2xl font-semibold">
                    {orders[service.id]?.length || 0}
                  </h6>
                </div>
              </div>
              <div className="max-w-[7rem] max-h-[4rem] overflow-hidden">
                <ChartContainer config={chartConfig} className="w-[7rem] h-[8rem]">
                  <AreaChart accessibilityLayer data={data}>
                    <defs>
                      <linearGradient id={`fill${service.id}`} x1="0" x2="0" y1="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={chartConfig[service.id]?.color}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={chartConfig[service.id]?.color}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="uv"
                      type="natural"
                      fill={`url(#fill${service.id})`}
                      stroke={chartConfig[service.id]?.color}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
