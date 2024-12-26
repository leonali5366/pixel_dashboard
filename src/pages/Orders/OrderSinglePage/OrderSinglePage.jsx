import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderSinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [client, setClient] = useState({});
  const [allStaff, setAllStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/order/get/single/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data?.data || {});
        setClient(data?.client || {});
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/client/all/staff`)
      .then((res) => res.json())
      .then((data) => {
        setAllStaff(data?.staff || []);
      });
  }, []);

  const handleStaffSelect = (email) => {
    setSelectedStaff((prevSelected) => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter((e) => e !== email);
      } else {
        return [...prevSelected, email];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back
        </button>
      </div>

      {/* Client Details */}
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto mb-6">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Client Information</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {client.name || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {client.email || "N/A"}
          </p>
          <button
            onClick={() => navigate(`/client/profile/${client._id}`)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            View Client Profile
          </button>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-gray-700">
              <span className="font-semibold">Service:</span> {order.service || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Budget:</span> ${order.budget || 0} ({order.currency || "N/A"})
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span> {order.status || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Deadline:</span> {order.deadline ? new Date(order.deadline).toLocaleDateString() : "N/A"}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Requirements</h3>
            <p className="text-gray-700 mt-2">
              {showMore || (order.requirements || "").length <= 100
                ? order.requirements || "N/A"
                : `${(order.requirements || "").slice(0, 100)}...`}
              {order.requirements && order.requirements.length > 100 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-blue-500 ml-2"
                >
                  {showMore ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        </div>

        {/* Staff Assignment */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800">Assign Staff</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {allStaff.map((staff) => (
              <div
                key={staff._id}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                  selectedStaff.includes(staff.email) ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
                }`}
                onClick={() => handleStaffSelect(staff.email)}
              >
                <img
                  src={staff.photo}
                  alt={staff.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{staff.name}</p>
                  <p className="text-gray-600 text-sm">{staff.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Staff */}
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto mt-6 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Staff</h3>
        {selectedStaff.length > 0 ? (
          <ul className="list-disc ml-6">
            {selectedStaff.map((email) => (
              <li key={email} className="text-gray-700">{email}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No staff selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrderSinglePage;
