/* eslint-disable no-unused-vars */
import useRefresh from "@/hooks/useRefresh";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const StaffSinglePage = () => {
  const { email } = useParams();
  const navigate = useNavigate(); // For navigation
  const [staff, setStaff] = useState({});
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const { staffRefresh, setStaffRefresh } = useRefresh();

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/client/single/byEmail?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setStaff(data?.client || {});
        setPosition(data?.client?.position || "Junior Staff"); // Default fallback
        setSalary(data?.client?.salary || "");
        setSalaryType(data?.client?.salaryType || "monthly");
      });
  }, [email, staffRefresh]);

  const handleUpdatePosition = () => {
    fetch(`http://localhost:5000/api/v1/client/update/position`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPosition: position }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`Position updated: ${position}`);
        setStaffRefresh(staffRefresh + 1);
      })
      .catch((err) => console.error("Error updating position:", err));
  };

  const handleUpdateSalary = () => {
    fetch(`http://localhost:5000/api/v1/client/update/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, salary, salaryType }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Salary updated successfully");
        setStaff((prev) => ({
          ...prev,
          salary,
          salaryType,
        }));
      })
      .catch((err) => console.error("Error updating salary:", err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Staff Details</h1>
      </div>

      {/* Staff Details Card */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-3xl mx-auto">
        {/* Photo */}
        <img
          src={staff.photo || "https://via.placeholder.com/300"}
          alt={staff.name}
          className="w-full h-[500px] object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {staff.name || "N/A"}
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              {staff.email || "N/A"}
            </p>

            {/* Phone */}
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span>{" "}
              {staff.phoneNumber || "N/A"}
            </p>

            {/* Address */}
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {staff.address || "N/A"}
            </p>

            {/* Gender */}
            <p className="text-gray-700">
              <span className="font-semibold">Gender:</span>{" "}
              {staff.gender || "N/A"}
            </p>

            {/* Status */}
            <p
              className={`text-sm font-semibold ${
                staff.status === "active" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {staff.status || "N/A"}
            </p>
          </div>

          {/* Position Dropdown */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Position</h3>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-2 p-2 border rounded-md w-full"
            >
              <option value="Junior Staff">Junior Staff</option>
              <option value="Staff">Staff</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Senior Staff">Senior Staff</option>
              <option value="Senior Staff & Partner">
                Senior Staff & Partner
              </option>
            </select>
            <button
              onClick={handleUpdatePosition}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Update Position
            </button>
          </div>

          {/* Salary Form */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Salary</h3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary Amount"
                className="p-2 border rounded-md w-full"
              />
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="p-2 border rounded-md w-full"
              >
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
              </select>
            </div>
            <button
              onClick={handleUpdateSalary}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Update Salary
            </button>
          </div>

          {/* Profile Button */}
          {/* Profile Button */}
          <Link
            to={`/profile/staff/${email}`}
            className="mt-4 px-4 py-2 bg-blue-500 max-w-[200px] text-white rounded-md hover:bg-blue-600 block text-center"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffSinglePage;
