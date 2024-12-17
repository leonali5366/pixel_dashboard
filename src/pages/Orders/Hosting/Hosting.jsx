import React from "react";

const Hosting = () => {
  // Dummy data for demonstration
  const stats = {
    totalOrders: 320,
    ongoingOrders: 75,
    completedOrders: 220,
    canceledOrders: 25,
    revenue: 120000, // in USD
    ongoingRevenue: 20000,
  };

  const orders = [
    { id: 1, client: "John Doe", service: "Shared Hosting", status: "Ongoing", amount: 100 },
    { id: 2, client: "Emily Carter", service: "VPS Hosting", status: "Completed", amount: 800 },
    { id: 3, client: "Mike Brown", service: "Cloud Hosting", status: "Canceled", amount: 0 },
    { id: 4, client: "Sophia Green", service: "Dedicated Hosting", status: "Completed", amount: 1500 },
    // More dummy orders...
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Hosting Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-800">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-800">Ongoing Orders</h2>
          <p className="text-3xl font-bold">{stats.ongoingOrders}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-red-800">Canceled Orders</h2>
          <p className="text-3xl font-bold">{stats.canceledOrders}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-yellow-800">Revenue</h2>
          <p className="text-3xl font-bold">${stats.revenue}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-purple-800">Ongoing Revenue</h2>
          <p className="text-3xl font-bold">${stats.ongoingRevenue}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Order ID</th>
              <th className="border border-gray-300 p-2 text-left">Client</th>
              <th className="border border-gray-300 p-2 text-left">Service</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.client}</td>
                <td className="border border-gray-300 p-2">{order.service}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    order.status === "Ongoing"
                      ? "text-yellow-600"
                      : order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border border-gray-300 p-2">${order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hosting;
