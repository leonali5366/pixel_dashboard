/* eslint-disable no-unused-vars */
import useRefresh from "@/hooks/useRefresh";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const { ticketRefresh } = useRefresh();

  // Fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/ticket/all");
      const data = await response.json();

      if (data?.status === "success") {
        // Filter tickets to include only those with 'new' or 'in progress' status
        const filteredTickets = data.data.filter(
          (ticket) => ticket.status === "new" || ticket.status === "in progress"
        );
        setTickets(filteredTickets); // Update tickets with filtered data
      } else {
        console.error("Failed to fetch tickets", data.message);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, [ticketRefresh]);

  // Filter tickets based on status
  const filteredTickets =
    filter === "All"
      ? tickets
      : tickets.filter(
          (ticket) => ticket.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          All Support Tickets
        </h1>
        <p className="text-gray-600">
          Manage all tickets and track their progress efficiently.
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
        <label className="text-gray-700 font-medium">Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer hover:border-gray-400"
        >
          <option value="All">All</option>
          <option value="new">New</option>
          <option value="in progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Ticket Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-5xl mx-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Title</th>

              <th className="px-6 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Priority
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr
                  onClick={() => {
                    navigate(`/ticket/single/${ticket._id}`);
                  }}
                  key={ticket._id}
                  className="border-b hover:bg-gray-100 cursor-pointer transition-all duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ticket._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ticket.title}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-medium ${
                      ticket.status.toLowerCase() === "new"
                        ? "text-blue-600"
                        : ticket.status.toLowerCase() === "in progress"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {ticket.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ticket.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {ticket.priority.charAt(0).toUpperCase() +
                      ticket.priority.slice(1)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTickets;
