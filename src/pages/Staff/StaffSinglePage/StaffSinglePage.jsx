/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StaffSinglePage = () => {
  const { email } = useParams();
  const [staff, setStaff] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/client/single/byEmail?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStaff(data?.client || {});
      });
  }, [email]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
          <h2 className="text-2xl font-bold text-gray-800">{staff.name || "N/A"}</h2>
          <p className="text-gray-500 text-sm mt-2">
            Role: <span className="font-semibold">{staff.role || "N/A"}</span>
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {staff.email || "N/A"}
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

            {/* Salary */}
            <p className="text-gray-700">
              <span className="font-semibold">Salary:</span> $
              {staff.salary || "0.00"} ({staff.salaryType || "N/A"})
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

          {/* Additional Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Skill:</span> {staff.skill || "N/A"}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Experience:</span>{" "}
              {staff.experience?.length > 0
                ? staff.experience.map((exp, i) => (
                    <span key={i}>{exp.title || "N/A"}{i !== staff.experience.length - 1 ? ", " : ""}</span>
                  ))
                : "No experience provided."}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Certificates:</span>{" "}
              {staff.certificate?.length > 0
                ? staff.certificate.map((cert, i) => (
                    <span key={i}>{cert.name || "N/A"}{i !== staff.certificate.length - 1 ? ", " : ""}</span>
                  ))
                : "No certificates provided."}
            </p>
          </div>

          {/* Starting Date */}
          <p className="text-gray-500 text-sm mt-4">
            Starting Date:{" "}
            {staff.startingDate
              ? new Date(staff.startingDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Added on:{" "}
            {staff.createdAt
              ? new Date(staff.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffSinglePage;
