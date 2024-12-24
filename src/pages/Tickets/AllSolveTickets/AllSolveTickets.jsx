/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const AllSolveTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/ticket/all");
      const data = await response.json();

      if (data?.status === "success") {
        // Filter tickets to only include solved ones
        const solvedTickets = data.data.filter(ticket => ticket.status === "solved");
        setTickets(solvedTickets); // Update tickets with solved tickets data
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
  }, []);

  // Filter tickets by search term
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket._id.toString().includes(search) ||
      ticket.assignee.toLowerCase().includes(search.toLowerCase())
  );

  // Delete a ticket by its ID
  const handleDelete = (ticketId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (confirmDelete) {
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Solved Tickets</h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by ticket ID, title, or assignee"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Ticket Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Ticket ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
              
              <th className="px-6 py-3 text-left text-sm font-medium">Assignee</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="border-b hover:bg-gray-100 cursor-pointer transition-all duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">{ticket._id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{ticket.title}</td>
                  
                  <td className="px-6 py-4 text-sm text-gray-800">{ticket.assignee}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No solved tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSolveTickets;
