import { AuthContext } from "@/Context/UserContext";
import useGetClientOrders from "@/hooks/useGetClientOrders";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ClientNewOrderSinglePage = () => {
  const { id } = useParams();
  console.log(id);
  const { newOrders } = useGetClientOrders(); 
  const [order, setOrder] = useState(null); // State for the specific order
  const { user } = useContext(AuthContext); // Get the authenticated user from context
  const navigate = useNavigate(); // React Router's navigate function for navigation

  useEffect(() => {
    // Find the specific order by ID from the list of new orders
    const selectedOrder = newOrders.find((order) => order._id === id);
    setOrder(selectedOrder || null);
  }, [id, newOrders]);

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Order not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        <div className="bg-blue-100 text-blue-600 p-3 rounded-md font-medium">
          Logged in as: {user?.email}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
      >
        Back
      </button>

      {/* Order Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Order ID: {order._id}
        </h2>
        <p className="text-gray-600">
          <span className="font-semibold">Service:</span> {order.service}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Technology:</span>{" "}
          {order.technology || "N/A"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Budget:</span> {order.currency}{" "}
          {order.budget}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Money Due:</span> {order.currency}{" "}
          {order.moneyDue}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Money Paid:</span> {order.currency}{" "}
          {order.moneyPaid}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-medium ${
              order.status === "new"
                ? "text-blue-600"
                : order.status === "completed"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Deadline:</span>{" "}
          {order.deadline
            ? new Date(order.deadline).toLocaleDateString()
            : "No Deadline"}
        </p>
      </div>

      {/* Requirements Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Requirements:</h2>
        <p className="text-gray-600 mt-2">
          {order.requirements || "No requirements provided."}
        </p>
      </div>
    </div>
  );
};

export default ClientNewOrderSinglePage;
