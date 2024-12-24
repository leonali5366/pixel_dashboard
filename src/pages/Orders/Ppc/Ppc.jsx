import { useEffect, useState } from "react";

const Ppc = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders)
  const [stats, setStats] = useState({
    totalOrders: 0,
    ongoingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    revenue: 0,
    ongoingRevenue: 0,
  });

  // Fetch Orders by Service
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/order/get/orderByService?service=ppc`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          setOrders(data.data);
          calculateStats(data.data);
        }
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Calculate statistics dynamically
  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;

    const ongoingOrders = ordersData.filter(
      (order) => order.status === "in progress"
    ).length;

    const completedOrders = ordersData.filter(
      (order) => order.status === "Completed"
    ).length;

    const canceledOrders = ordersData.filter(
      (order) => order.status === "Canceled"
    ).length;

    const revenue = ordersData
      .filter((order) => order.status === "Completed")
      .reduce((sum, order) => sum + order.moneyPaid, 0);

    const ongoingRevenue = ordersData
      .filter((order) => order.status === "in progress")
      .reduce((sum, order) => sum + order.moneyDue, 0);

    setStats({
      totalOrders,
      ongoingOrders,
      completedOrders,
      canceledOrders,
      revenue,
      ongoingRevenue,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">PPC Dashboard</h1>

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
          <h2 className="text-lg font-semibold text-purple-800">
            Ongoing Revenue
          </h2>
          <p className="text-3xl font-bold">${stats.ongoingRevenue}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Details
        </h2>
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
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.email}</td>
                <td className="border border-gray-300 p-2">{order.service}</td>
                <td
                  className={`border border-gray-300 p-2 ${
                    order.status === "in progress"
                      ? "text-yellow-600"
                      : order.status === "Completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border border-gray-300 p-2">
                  ${order.moneyPaid || order.moneyDue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ppc;
