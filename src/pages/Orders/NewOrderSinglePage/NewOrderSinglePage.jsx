
import { useParams, useNavigate } from "react-router-dom";
import useOrders from "@/hooks/useOrders";
import useRefresh from "@/hooks/useRefresh";
import toast from "react-hot-toast";

const NewOrderSinglePage = () => {
  const { newOrders } = useOrders();
  const { id } = useParams();
  const navigate = useNavigate();
  const { orderRefresh, setOrderRefresh } = useRefresh();

  const order = newOrders.find((order) => order._id === id);
  

  const handleAccept = () => {
    fetch(`http://localhost:5000/api/v1/order/acceptOrder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/new");
        setOrderRefresh(orderRefresh + 1);
        toast.success("Order accepted successfully");
      });
  };

  const handleReject = () => {
    fetch(`http://localhost:5000/api/v1/order/rejectOrder/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/new");
        setOrderRefresh(orderRefresh + 1);
        toast.success("Order Reject successfully");
      });
  };

  

  if (!order) {
    return <div className="text-center text-red-500">Order not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="border rounded p-4 shadow">
        <h2 className="text-lg font-semibold">Service: {order.service}</h2>
        <p>Email: {order.email}</p>
        <p>Budget: ${order.budget}</p>
        <p>Status: {order.status}</p>
        <p>Requirements: {order.requirements}</p>
        <p>
          Deadline:{" "}
          {order.deadline
            ? new Date(order.deadline).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleAccept}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reject
        </button>
        
      </div>

      
    </div>
  );
};

export default NewOrderSinglePage;
