import useGetClientOrders from "@/hooks/useGetClientOrders";
import { useNavigate } from "react-router-dom";

const ClientCurrentOrders = () => {
  const { currentOrders, currentCount } = useGetClientOrders();
  console.log(currentCount);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Current Orders</h1>
        <div className="bg-blue-100 text-blue-600 p-3 rounded-md font-medium">
          Total Budget: ${currentCount.totalBudget || 0}
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Budget</h2>
          <p className="text-gray-600 mt-2">${currentCount.totalBudget || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Due</h2>
          <p className="text-gray-600 mt-2">${currentCount.totalDue || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Paid</h2>
          <p className="text-gray-600 mt-2">${currentCount.totalPaid || 0}</p>
        </div>
      </div>

      {/* Current Orders List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Orders List
        </h2>
        {currentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Service
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Budget
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Due
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr
                    onClick={() =>
                      navigate(`/order/client/single/current/${order._id}`)
                    }
                    key={order._id}
                    className="border-b border-gray-200 hover:bg-gray-400 cursor-pointer"
                  >
                    <td className="p-4 text-gray-700">{order._id}</td>
                    <td className="p-4 text-gray-700">{order.service}</td>
                    <td className="p-4 text-gray-700">
                      {order.currency} {order.budget}
                    </td>
                    <td className="p-4 text-gray-700">
                      {order.currency} {order.moneyDue}
                    </td>
                    <td className="p-4 text-gray-700">
                      <span
                        className={`font-medium ${
                          order.status === "in progress"
                            ? "text-blue-600"
                            : order.status === "assigned"
                            ? "text-yellow-600"
                            : order.status === "on review"
                            ? "text-purple-600"
                            : order.status === "delivered"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4">
            No current orders available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientCurrentOrders;
