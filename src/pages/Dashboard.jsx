import ActiveOrders from "@/components/Dashboard/ActiveOrders";
import Campaigns from "@/components/Dashboard/Campaigns";
import CustomerOverview from "@/components/Dashboard/CustomerOverview";
import InfoCard from "@/components/Dashboard/InfoCard";
import PaymentStatus from "@/components/Dashboard/PaymentStatus";
import { Statistics } from "@/components/Dashboard/Statistics";
import { Statistics2 } from "@/components/Dashboard/Statistics2";
import TopPerformer from "@/components/Dashboard/TopPerformer";
import TotalRevenue from "@/components/Dashboard/TotalRevenue";

export default function Dashboard() {
  return (
    <div className="p-5 flex flex-col gap-y-5">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="w-full inline-flex gap-x-5">
        <InfoCard />
        {/* <div className="w-full">
          <TotalRevenue />
        </div> */}
      </div>
      <ActiveOrders />
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Statistics />
        <Statistics2 />
        {/* <div className="w-full flex flex-col gap-y-5">
        </div> */}
        {/* <div className="flex flex-col gap-y-5 w-full">
          <Campaigns />
          <CustomerOverview />
        </div> */}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-5">
        <PaymentStatus />
        <TopPerformer />
      </div>
    </div>
  );
}
