import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import useRefresh from "@/hooks/useRefresh";
import { Link } from "react-router-dom";

const AllStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const { staffRefresh } = useRefresh();

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
          staffs.map((staff) => (
            <Link to={`/staff/single/${staff?.email}`} // Use the correct path
              key={staff?.email} // Use a unique key like _id if available
              className="bg-white shadow-md rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Photo */}
              <img
                src={staff.photo || "https://github.com/shadcn.png"}
                alt={staff.name || "Staff Member"}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                {/* Name */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {staff.name || "N/A"}
                </h2>

                {/* Email */}
                <p className="text-gray-500 text-sm mt-1">
                  Email: {staff.email || "N/A"}
                </p>

                {/* Skill */}
                <p className="text-gray-500 text-sm mt-1">
                  Skill: {staff.skill || "No Skill Mentioned"}
                </p>

                {/* Salary */}
                <p className="text-gray-700 text-sm mt-1">
                  Salary:{" "}
                  <span className="font-semibold">
                    ${staff.salary || "0.00"}
                  </span>{" "}
                  ({staff.salaryType || "N/A"})
                </p>

                {/* Status */}
                <p
                  className={`text-sm font-semibold mt-1 ${
                    staff.status === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {staff.status || "N/A"}
                </p>

                {/* Added Date */}
                <p className="text-gray-500 text-xs mt-2">
                  Added on:{" "}
                  {staff.createdAt
                    ? new Date(staff.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </Link>
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
