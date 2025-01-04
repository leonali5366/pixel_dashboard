import GetSingleOrder from "@/Functions/GetSingleOrder";
import getRemainingTime from "@/Functions/TimeCountDown";
import useAllStaff from "@/hooks/useAllStaff";
import useOrders from "@/hooks/useOrders";
import useRefresh from "@/hooks/useRefresh";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const OrderSinglePage = () => {
  const { id } = useParams();
  const { allStaff } = useAllStaff();
  const { orderRefresh, setOrderRefresh } = useOrders();

  const [order, setOrder] = useState({});
  const [client, setClient] = useState({});
  const [countdown, setCountdown] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState(allStaff || []);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [payError, setPayError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setStaff(order?.staffAssigned || []);
  }, [order?.staffAssigned, orderRefresh]);

  useEffect(() => {
    const updateCountdown = () =>
      setCountdown(getRemainingTime(order?.deadline));
    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [order?.deadline]);

  useEffect(() => {
    GetSingleOrder(id, setOrder, setClient);
  }, [id, orderRefresh]);

  useEffect(() => {
    if (filterRole) {
      setFilteredStaff(
        (allStaff || []).filter((staff) =>
          staff.skill?.toLowerCase().includes(filterRole.toLowerCase())
        )
      );
    } else {
      setFilteredStaff(allStaff || []);
    }
  }, [filterRole, allStaff]);

  const handleAddStaff = (staff) => {
    setSelectedStaff((prevStaff) => {
      // Check if the staff is already added
      if (prevStaff.some((s) => s._id === staff._id)) {
        return prevStaff; // Do nothing if staff is already in the list
      }
      return [...prevStaff, staff]; // Add the new staff to the list
    });
  };

  const handleRemoveStaff = (staffId) => {
    setSelectedStaff(
      (prevStaff) => prevStaff.filter((s) => s._id !== staffId) // Remove the staff by ID
    );
  };

  const handleRemoveAssignStaff = (staffEmail) => {
    fetch(`http://localhost:5000/api/v1/order/remove/staff/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ staffEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("Staff removed successfully.");
          setOrderRefresh(orderRefresh + 1);
        } else {
          console.error("Failed to remove staff.");
        }
      });
  };

  const handleConfirmStaff = () => {
    const staff = selectedStaff[0];
    console.log(staff);

    fetch(`http://localhost:5000/api/v1/order/assign/staff/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(staff),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setOrder(data.data);
          toast.success("Staff assigned successfully.");
          setOrderRefresh(orderRefresh + 1);
          setSelectedStaff([]);
        } else {
          console.error("Failed to assign staff.");
        }
      });
  };

  const handleSubmitPayment = () => {
    setPayError("");
    if (paymentAmount > 0 && paymentAmount <= order?.budget) {
      fetch(
        `http://localhost:5000/api/v1/order/payment/${id}/${paymentAmount}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            toast.success("Payment made successfully.");
            setOrderRefresh(orderRefresh + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
    } else {
      console.error("Invalid payment amount.");
      setPayError("Invalid payment amount.");
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Details:</h1>
        <div className="text-lg font-medium text-green-600">
          Countdown: {countdown}
        </div>
      </div>

      {/* Client and Order Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Client Details */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Client Information
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <img
                className="w-12 h-12 rounded-full"
                src={
                  client?.photo
                    ? client?.photo
                    : "https://github.com/shadcn.png"
                }
                alt=""
              />
            </p>
            <p>
              <span className="font-semibold">Name:</span> {client?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {client?.email}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Order Details
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
            <div>
              <p className="font-semibold">Service:</p>
              <p>{order?.service}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{order?.status}</p>
            </div>
            <div>
              <p className="font-semibold">Budget:</p>
              <p>
                {order?.currency} {order?.budget}
              </p>
            </div>
            <div>
              <p className="font-semibold">Money Due:</p>
              <p>
                {order?.currency} {order?.moneyDue}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Assignment */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          Staff Assignment
        </h2>
        <div className="space-y-4">
          {/* Assigned Staff */}
          <div>
            {staff.length === 0 ? (
              <div>
                <h1>No staff assigned</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {staff.map((st) => (
                  <div key={st?.email} className="relative">
                    <div className="card shadow-lg p-6 rounded-lg flex items-center gap-6 w-[320px]">
                      {/* Staff Image */}
                      <img
                        className="w-20 h-20 rounded-full border object-cover"
                        src={
                          st?.photo
                            ? st?.photo
                            : "https://github.com/shadcn.png"
                        }
                        alt={`${st?.name}'s profile`}
                      />
                      {/* Staff Details */}
                      <div className="flex-1">
                        <h1 className="font-semibold text-gray-800 text-lg">
                          {st?.name}
                        </h1>
                        <p className="text-gray-600 text-sm">{st?.email}</p>
                        <p className="text-gray-600 text-sm">{st?.skill}</p>
                      </div>
                      {/* Remove Icon */}
                      <Trash2
                        className="absolute top-4 right-0 text-red-500 cursor-pointer hover:scale-110"
                        onClick={() => handleRemoveAssignStaff(st?.email)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">New Assigned Staff:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {selectedStaff.map((staff) => (
                <div
                  key={staff._id}
                  className="p-2 bg-gray-100 rounded-md flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={staff.photo}
                      alt={staff.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{staff.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveStaff(staff._id)}
                    className="text-red-500 w-[20px]"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Staff */}
          <div className="flex items-center gap-2">
            <label htmlFor="roleFilter" className="text-gray-700 font-medium">
              Filter by Skill:
            </label>
            <select
              id="roleFilter"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="p-2 border rounded-md text-gray-700"
            >
              <option value="">All Roles</option>
              <option value="MERN Developer">MERN Developer</option>
              <option value="SEO Expert">SEO Expert</option>
              <option value="WordPress Developer">WordPress Developer</option>
              <option value="Shopify Developer">Shopify Developer</option>
              <option value="Wix Developer">Wix Developer</option>
              <option value="PPC Expert">PPC Expert</option>
              <option value="Hosting Expert">Hosting Expert</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="Content Writer">Content Writer</option>
              <option value="Video Editor">Video Editor</option>
            </select>
          </div>

          {/* Available Staff */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {filteredStaff.map((staff) => (
              <div
                key={staff._id}
                className="p-2 bg-gray-100 rounded-md flex items-center gap-2 cursor-pointer"
                onClick={() => handleAddStaff(staff)}
              >
                <img
                  src={staff.photo}
                  alt={staff.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{staff.name}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleConfirmStaff}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Confirm Staff
          </button>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Payment</h2>
        <div className="space-y-4">
          <label htmlFor="paymentAmount" className="text-gray-700 font-medium">
            Enter Payment Amount:
          </label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full p-2 border rounded-md text-gray-700"
            placeholder={`Enter amount (max: ${order?.currency} ${order?.budget})`}
          />
          <p className="text-red-600">{payError}</p>
          <button
            onClick={handleSubmitPayment}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Submit Payment
          </button>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Order Requirement:</h1>
        <p className="text-gray-600 mt-2">
          {order?.requirements
            ? isExpanded
              ? order.requirements // Show full text if expanded
              : order.requirements.slice(0, 250) +
                (order.requirements.length > 250 ? "..." : "")
            : "No requirements provided."}
        </p>
        {order?.requirements?.length > 250 && (
          <button onClick={handleToggle} className="text-blue-500 mt-2">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSinglePage;
