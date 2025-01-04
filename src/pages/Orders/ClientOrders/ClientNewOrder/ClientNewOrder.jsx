import useGetClientOrders from "@/hooks/useGetClientOrders";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ClientNewOrder = () => {
  const { newOrders, newTotalBudget } = useGetClientOrders();
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Client Orders</h1>
        <div className="bg-green-100 text-green-600 p-3 rounded-md font-medium">
          Total Budget: ${newTotalBudget}
        </div>
      </div>

      {/* Orders Table */}
      {newOrders.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            New Orders
          </h2>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Service</th>
                <th className="py-3 px-6 text-left">Technology</th>
                <th className="py-3 px-6 text-left">Budget</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {newOrders.map((order) => (
                <tr
                onClick={() => navigate(`/order/client/single/new/${order._id}`)}
                  key={order._id}
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{order._id}</td>
                  <td className="py-3 px-6 text-left">{order.service}</td>
                  <td className="py-3 px-6 text-left">
                    {order.technology || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {order.currency} {order.budget}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {order.deadline
                      ? format(new Date(order.deadline), "yyyy-MM-dd")
                      : "No Deadline"}
                  </td>
                  <td
                    className={`py-3 px-6 text-left font-medium ${
                      order.status === "new"
                        ? "text-blue-600"
                        : order.status === "completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md text-gray-500">
          No new orders available.
        </div>
      )}
    </div>
  );
};

export default ClientNewOrder;
