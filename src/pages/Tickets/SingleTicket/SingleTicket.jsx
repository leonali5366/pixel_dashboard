import useRefresh from "@/hooks/useRefresh";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const SingleTicket = () => {
  const { id } = useParams(); // Get ticket ID from the URL
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    createdAt: "",
    resolvedAt: "",
  });
  const { ticketRefresh, setTicketRefresh } = useRefresh();

  // Fetch ticket data by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/ticket/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTicket(data.data); // Set ticket data
      })
      .catch((error) => console.error("Error fetching ticket data:", error));
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  };

  // Handle form submit to update ticket data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTicket = {
      title: ticket.title,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/ticket/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTicket),
        }
      );
      const data = await response.json();

      if (data?.status === "success") {
        toast.success("Ticket updated successfully!");
        setTicketRefresh(ticketRefresh + 1); // Trigger ticket refresh using useRefresh hook
        navigate("/ticket/all"); // Redirect to tickets page using navigate
      } else {
        alert("Failed to update ticket.");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Error updating ticket.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Ticket Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Ticket</h1>

        {/* Ticket Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={ticket.title}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={ticket.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium" htmlFor="priority">
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="text-gray-600 font-medium" htmlFor="status">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={ticket.status}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="new">New</option>
              <option value="in progress">In Progress</option>
              <option value="solved">Solved</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Update Ticket
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate("/tickets")} // Use navigate for cancel action
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleTicket;
