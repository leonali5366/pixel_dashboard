/* eslint-disable react-hooks/exhaustive-deps */
import { AuthContext } from "@/Context/UserContext";
import useRefresh from "@/hooks/useRefresh";
import { useState, useEffect, useContext } from "react";

const ClientOrders = () => {
  const { user } = useContext(AuthContext);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [timeLeft, setTimeLeft] = useState([]);
  const { orderRefresh } = useRefresh();

  useEffect(() => {
    // Fetch orders from the API
    if (user?.email) {
      fetch(
        `http://localhost:5000/api/v1/order/get/clientAllOrder?email=${user.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data?.status === "success") {
            const orders = data.data;

            // Separate current and previous orders
            const current = orders.filter(
              (order) =>
                order.status === "new" ||
                order.status === "in-progress" ||
                order.status === "awaiting-payment"
            );
            const previous = orders.filter(
              (order) => order.status === "completed" || order.status === "cancelled"
            );

            setCurrentOrders(current);
            setPreviousOrders(previous);

            // Initialize time left for current orders
            setTimeLeft(
              current.map((order) =>
                order.deadline ? calculateTimeLeft(order.deadline) : null
              )
            );
          }
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [user?.email, orderRefresh]);

  // Calculate time left for each current order
  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const delivery = new Date(deadline);
    const diff = delivery - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimes) =>
        currentOrders.map((order, index) =>
          order.deadline ? calculateTimeLeft(order.deadline) : prevTimes[index]
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [currentOrders]);

  const totalAmount = (orders) =>
    orders.reduce((acc, order) => acc + (order.budget || 0), 0);

  const totalMoneyDue = (orders) =>
    orders.reduce((acc, order) => acc + (order.moneyDue || 0), 0);

  const totalMoneyPaid = (orders) =>
    orders.reduce((acc, order) => acc + (order.moneyPaid || 0), 0);

  return (
    <div className="p-8 bg-[#f6f7f9] min-h-screen text-gray-800">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Client Orders</h1>
        <p className="text-lg text-gray-500">
          Track your ongoing and previous orders seamlessly.
        </p>
      </header>

      {/* Dashboard Overview */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Current Orders
          </h2>
          <p className="text-lg text-gray-500">
            Project Budget:{" "}
            <span className="font-bold text-blue-600">
              ${totalAmount(currentOrders)}
            </span>
          </p>
          <p className="text-lg text-gray-500">
            Total Money Due:{" "}
            <span className="font-bold text-blue-600">
              ${totalMoneyDue(currentOrders)}
            </span>
          </p>
          <p className="text-lg text-gray-500">
            Total Money Paid:{" "}
            <span className="font-bold text-blue-600">
              ${totalMoneyPaid(currentOrders)}
            </span>
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Previous Orders
          </h2>
          <p className="text-lg text-gray-500">
            Project Budget:{" "}
            <span className="font-bold text-green-600">
              ${totalAmount(previousOrders)}
            </span>
          </p>
          <p className="text-lg text-gray-500">
            Total Money Due:{" "}
            <span className="font-bold text-green-600">
              ${totalMoneyDue(previousOrders)}
            </span>
          </p>
          <p className="text-lg text-gray-500">
            Total Money Paid:{" "}
            <span className="font-bold text-green-600">
              ${totalMoneyPaid(previousOrders)}
            </span>
          </p>
        </div>
      </div>

      {/* Orders Section */}
      <section>
        {/* Current Orders */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Current Orders</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {currentOrders.map((order, index) => (
              <div
                key={order._id}
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {order.service}
                </h3>
                <p className="text-gray-500">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500">Status: {order.status}</p>
                <p className="text-gray-500">
                  Delivery Date:{" "}
                  {order.deadline
                    ? new Date(order.deadline).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-lg font-bold text-gray-700 mt-4">
                  Project Budget: ${order.budget || 0}
                </p>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  Money Due: ${order.moneyDue || 0}
                </p>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  Money Paid: ${order.moneyPaid || 0}
                </p>
                {timeLeft[index] && (
                  <div className="mt-4 text-sm text-gray-600">
                    Time Left:{" "}
                    <span className="font-semibold text-red-600">
                      {timeLeft[index].days}d {timeLeft[index].hours}h{" "}
                      {timeLeft[index].minutes}m {timeLeft[index].seconds}s
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Previous Orders */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Previous Orders</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {previousOrders.map((order) => (
              <div
                key={order._id}
                className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {order.service}
                </h3>
                <p className="text-gray-500">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500">Status: {order.status}</p>
                <p className="text-gray-500">
                  Delivery Date:{" "}
                  {order.deadline
                    ? new Date(order.deadline).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-lg font-bold text-gray-700 mt-4">
                  Project Budget: ${order.budget || 0}
                </p>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  Money Due: ${order.moneyDue || 0}
                </p>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  Money Paid: ${order.moneyPaid || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientOrders;
