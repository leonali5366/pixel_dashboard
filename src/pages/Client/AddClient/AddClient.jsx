/* eslint-disable no-unused-vars */
import useRefresh from "@/hooks/useRefresh";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clientRefresh, setClientRefresh } = useRefresh();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();

    // Simple frontend validation (optional)
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    fetch("http://localhost:5000/api/v1/client/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.success("client created successfully");
          // Reset form
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          navigate("/client/all");
          setClientRefresh(clientRefresh + 1);
        } else {
          setError(data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      {/* Top Heading */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Add New Client
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Please fill in the form below to add a new client.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter client name"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter client email"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter client password"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <p className="text-600 text-center">{error}</p>
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Client
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
