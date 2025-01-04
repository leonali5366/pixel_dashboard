import useOrders from "@/hooks/useOrders";
import { useNavigate } from "react-router-dom";

const NewOrders = () => {
  const { newOrders } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">New Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {newOrders?.length === 0 ? (
          <div className="text-center col-span-3 mt-[20%]">
            <h2 className="text-lg font-semibold">No new orders available</h2>
          </div>
        ) : (
          <div>
            {newOrders.map((order) => (
              <div
                key={order._id}
                className="border rounded p-4 shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/new/single/${order._id}`)}
              >
                <h2 className="text-lg font-semibold">{order.service}</h2>
                <p className="text-sm text-gray-600">Email: {order.email}</p>
                <p className="text-sm text-gray-600">Budget: ${order.budget}</p>
                <p className="text-sm text-gray-600">Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrders;
