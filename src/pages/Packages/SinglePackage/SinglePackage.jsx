/* eslint-disable no-unused-vars */
import useRefresh from "@/hooks/useRefresh";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SinglePackage = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [newPlan, setNewPlan] = useState("");
  const [ref, setRef] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/package/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPkg(data.data);
        setFormData({
          name: data.data.name || "",
          description: data.data.description || "",
          price: data.data.price || "",
        });
      });
  }, [id, ref]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/v1/package/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Package updated successfully!");
        setPkg(data.data);
        setRef(ref + 1);
      })
      .catch((err) => alert("Error updating package"));
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    console.log(newPlan);
    fetch(`http://localhost:5000/api/v1/package/addPlan/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: newPlan }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Plan added successfully!");
        setPkg((prev) => ({ ...prev, plans: [...prev.plans, data.data] }));
        setNewPlan("");
        setRef(ref + 1);
      })
      .catch((err) => alert("Error adding plan"));
  };

  const handleDeletePlan = (planId) => {
    fetch(`http://localhost:5000/api/v1/package/delete/${id}/${planId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Plan deleted successfully!");
        setPkg((prev) => ({
          ...prev,
          plans: prev.plans.filter((plan) => plan._id !== planId),
        }));
        setRef(ref + 1);
      })
      .catch((err) => alert("Error deleting plan"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Edit Package: {pkg.name || "Loading..."}
      </h1>

      {/* Update Package Form */}
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Package
        </button>
      </form>

      {/* Add New Plan Form */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Add New Plan:</h2>
        <form className="flex items-center space-x-4" onSubmit={handleAddPlan}>
          <input
            type="text"
            value={newPlan}
            onChange={(e) => setNewPlan(e.target.value)}
            placeholder="Enter plan description"
            className="flex-grow p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Plan
          </button>
        </form>
      </div>

      {/* Plans List */}
      {pkg.plans && pkg.plans.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Plans:</h2>
          <ul className="space-y-2">
            {pkg.plans.map((plan) => (
              <li
                key={plan._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                <p className="text-gray-800 font-medium">{plan.plan}</p>
                <button
                  onClick={() => handleDeletePlan(plan._id)}
                  className="text-red-500 font-medium hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SinglePackage;
