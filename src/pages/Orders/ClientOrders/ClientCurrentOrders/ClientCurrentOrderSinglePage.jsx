import { AuthContext } from "@/Context/UserContext";
import useGetClientOrders from "@/hooks/useGetClientOrders";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClientCurrentOrderSinglePage = () => {
  const { id } = useParams();
  const { currentOrders } = useGetClientOrders();
  const [order, setOrder] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const selectedOrder = currentOrders.find((order) => order._id === id);
    setOrder(selectedOrder || null);

    if (selectedOrder?.deadline) {
      const updateTime = () => {
        const now = new Date();
        const deadline = new Date(selectedOrder.deadline);
        const timeLeft = Math.max(0, deadline - now); // Prevent negative values
        setRemainingTime(timeLeft);
      };

      updateTime();
      const timer = setInterval(updateTime, 1000);
      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [id, currentOrders]);

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Order not found.
        </h1>
      </div>
    );
  }

  const moneyPaid = order?.budget - order?.moneyDue;

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md font-medium">
          Logged in as: {user?.email}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      {/* Layout: Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Information Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            General Information
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Service:</span> {order.service}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Technology:</span>{" "}
              {order.technology || "N/A"}
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
          </div>
        </div>

        {/* Countdown and Live Link Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Delivery Countdown
          </h2>
          {remainingTime !== null ? (
            <p className="text-xl font-semibold text-red-600 mb-4">
              {formatTime(remainingTime)}
            </p>
          ) : (
            <p className="text-gray-600 mb-4">No deadline set.</p>
          )}
          <p className="text-gray-600">
            <span className="font-semibold">Live Link:</span>{" "}
            {order.liveLink ? (
              <a
                href={order.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {order.liveLink}
              </a>
            ) : (
              "Not Available"
            )}
          </p>
        </div>

        {/* Financial Details Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Financial Details
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-semibold">Budget:</span> {order.currency}{" "}
              {order.budget}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Money Paid:</span>{" "}
              {order.currency} {moneyPaid}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Money Due:</span> {order.currency}{" "}
              {order.moneyDue}
            </p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Make Payment
            </button>
          </div>
        </div>

        {/* Assets Card */}
        <div className="bg-white rounded-lg shadow p-6">
          
          
          <div className="space-y-4 flex "><h2 className="text-xl font-semibold text-gray-700 mb-4 mr-5">Assets :</h2 >{order?.assets}</div>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Add Asset
          </button>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Requirements
        </h2>
        <p className="text-gray-600">
          {order.requirements || "No requirements provided."}
        </p>
      </div>
    </div>
  );
};

export default ClientCurrentOrderSinglePage;
