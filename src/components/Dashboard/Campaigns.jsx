import { useState } from "react";
import { CircleEllipsis, Globe, Mail } from "lucide-react";
import { FaFacebookSquare } from "react-icons/fa";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Campaigns() {
  const [timeRange, setTimeRange] = useState("90d");
  return (
    <Card className="w-full flex-col gap-y-3 flex p-5 h-fit">
      <div className="w-full inline-flex items-center justify-between">
        <h1 className="text-lg font-bold">Campaigns</h1>
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
      <div className="inline-flex items-center justify-between">
        <div className="inline-flex items-center gap-x-3">
          <Mail size={20} color="red" />
          <span className="text-sm font-medium">Email</span>
        </div>
        <div className="inline-flex items-center gap-x-3">
          <div className="h-2 bg-secondary w-[8rem] rounded-full">
            <div className="h-2 bg-red-500 w-[47%] rounded-full" />
          </div>
          <span className="font-semibold">47%</span>
        </div>
      </div>
      <div className="inline-flex items-center justify-between">
        <div className="inline-flex items-center gap-x-3">
          <Globe size={20} color="green" />
          <span className="text-sm font-medium">Website</span>
        </div>
        <div className="inline-flex items-center gap-x-3">
          <div className="h-2 bg-secondary w-[8rem] rounded-full">
            <div className="h-2 bg-red-500 w-[50%] rounded-full" />
          </div>
          <span className="font-semibold">50%</span>
        </div>
      </div>
      <div className="inline-flex items-center justify-between">
        <div className="inline-flex items-center gap-x-3">
          <FaFacebookSquare size={20} color="blue" />
          <span className="text-sm font-medium">Facebook</span>
        </div>
        <div className="inline-flex items-center gap-x-3">
          <div className="h-2 bg-secondary w-[8rem] rounded-full">
            <div className="h-2 bg-red-500 w-[50%] rounded-full" />
          </div>
          <span className="font-semibold">50%</span>
        </div>
      </div>
      <div className="inline-flex items-center justify-between">
        <div className="inline-flex items-center gap-x-3">
          <CircleEllipsis size={20} />
          <span className="text-sm font-medium">Other</span>
        </div>
        <div className="inline-flex items-center gap-x-3">
          <div className="h-2 bg-secondary w-[8rem] rounded-full">
            <div className="h-2 bg-red-500 w-[50%] rounded-full" />
          </div>
          <span className="font-semibold">50%</span>
        </div>
      </div>
    </Card>
  );
}
