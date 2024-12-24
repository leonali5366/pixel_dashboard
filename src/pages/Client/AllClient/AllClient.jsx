/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const AllClient = () => {
  const [clients, setClients] = useState([]);

  // Fetch all clients
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/client/all")
      .then((res) => res.json())
      .then((data) => setClients(data?.clients))
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        All Clients
      </h1>

      {/* Clients Table */}
      {clients && clients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            {/* Table Head */}
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left text-gray-600">Photo</th>
                <th className="border p-3 text-left text-gray-600">Name</th>
                <th className="border p-3 text-left text-gray-600">Email</th>
                <th className="border p-3 text-left text-gray-600">Phone</th>
                <th className="border p-3 text-left text-gray-600">Status</th>
                <th className="border p-3 text-left text-gray-600">Added On</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Photo */}
                  <td className="border p-3">
                    <img
                      src={client.photo || "https://github.com/shadcn.png"}
                      alt={client.name}
                      className="h-12 w-12 object-cover rounded-full"
                    />
                  </td>
                  {/* Name */}
                  <td className="border p-3">{client.name || "N/A"}</td>
                  {/* Email */}
                  <td className="border p-3">{client.email || "N/A"}</td>
                  {/* Phone */}
                  <td className="border p-3">{client.phoneNumber || "N/A"}</td>
                  {/* Status */}
                  <td
                    className={`border p-3 font-semibold ${
                      client.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {client.status || "N/A"}
                  </td>
                  {/* Created At */}
                  <td className="border p-3 text-gray-500">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No clients found.</p>
      )}
    </div>
  );
};

export default AllClient;
