import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import useRefresh from "@/hooks/useRefresh";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AllStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const { staffRefresh } = useRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/client/all/staff")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch staff data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setStaffs(data?.staff || []);
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error);
      });
  }, [staffRefresh]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-500" /> All Staff
        </h1>
      </div>

      {/* Staff Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {staffs.length > 0 ? (
          staffs.map((staff, index) => (
            <Card
              onClick={() => {
                navigate(`/staff/single/${staff.email}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              key={index}
            >
              <img
                src={staff.photo || "https://github.com/shadcn.png"}
                alt={staff.name}
                className="w-full h-40 object-cover rounded-t"
              />
              <CardContent className="mt-2">
                {/* Photo */}

                {/* Content */}
                <div className="flex flex-col gap-1">
                  {/* Name */}
                  <h2 className="text-xl font-semibold opacity-90">
                    {staff.name || "N/A"}
                  </h2>

                  {/* Email */}
                  <p className="text-sm font-medium opacity-90">
                    Email: {staff.email || "N/A"}
                  </p>

                  {/* Skill */}
                  <p className="text-sm font-medium opacity-90">
                    Skill: {staff.skill || "No Skill Mentioned"}
                  </p>

                  {/* Salary */}
                  <p className="text-sm font-medium opacity-90">
                    Salary:{" "}
                    <span className="font-semibold">
                      ${staff.salary || "0.00"}
                    </span>{" "}
                    ({staff.salaryType || "N/A"})
                  </p>

                  {/* Status */}
                  <p className={`text-sm font-medium opacity-90 `}>
                    Status:{" "}
                    <span
                      className={`${
                        staff.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {staff.status || "N/A"}
                    </span>
                  </p>

                  {/* Added Date */}
                  <p className="text-xs font-medium opacity-90">
                    Added on:{" "}
                    {staff.createdAt
                      ? new Date(staff.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No staff members found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllStaff;
