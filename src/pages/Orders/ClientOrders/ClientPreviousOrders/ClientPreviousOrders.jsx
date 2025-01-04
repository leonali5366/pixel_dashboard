import useGetClientOrders from "@/hooks/useGetClientOrders";

const ClientPreviousOrders = () => {
  const { previousOrders, previousCount, cancelOrder, rejectOrder } = useGetClientOrders();

  // Calculate Total Orders and Total Budget if not provided by `previousCount`
  const totalOrders = previousCount.total || previousOrders.length;
  const totalBudget =
    previousCount.totalBudget ||
    previousOrders.reduce((sum, order) => sum + (order.budget || 0), 0);

  // Calculate Canceled and Rejected Budgets
  const canceledBudget = cancelOrder?.reduce(
    (sum, order) => sum + (order.budget || 0),
    0
  );
  const rejectedBudget = rejectOrder?.reduce(
    (sum, order) => sum + (order.budget || 0),
    0
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-gray-600 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Budget</h2>
          <p className="text-gray-600 mt-2">${totalBudget.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Canceled Budget</h2>
          <p className="text-gray-600 mt-2">${canceledBudget?.toFixed(2) || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Rejected Budget</h2>
          <p className="text-gray-600 mt-2">${rejectedBudget?.toFixed(2) || 0}</p>
        </div>
      </div>

      {/* Previous Orders List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Orders List</h2>
        {previousOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">ID</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Budget</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {previousOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-4 text-gray-700">{order._id}</td>
                    <td className="p-4 text-gray-700">{order.service}</td>
                    <td className="p-4 text-gray-700">
                      {order.currency} {order.budget}
                    </td>
                    <td className="p-4 text-gray-700">
                      <span
                        className={`font-medium ${
                          order.status === "canceled"
                            ? "text-red-600"
                            : order.status === "completed"
                            ? "text-green-600"
                            : order.status === "rejected"
                            ? "text-yellow-600"
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
            No previous orders available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientPreviousOrders;
