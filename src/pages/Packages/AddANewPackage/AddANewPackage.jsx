import useRefresh from "@/hooks/useRefresh";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddANewPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packagePlans, setPackagePlans] = useState([{ plan: "" }]);
  const [packagePrice, setPackagePrice] = useState("");
  const { packageRefresh, setPackageRefresh } = useRefresh();
  const navigate = useNavigate();

  // Add a new plan field
  const addPlanField = () => {
    setPackagePlans([...packagePlans, { plan: "" }]);
  };

  // Handle input change for plans
  const handlePlanChange = (index, value) => {
    const updatedPlans = [...packagePlans];
    updatedPlans[index].plan = value;
    setPackagePlans(updatedPlans);
  };

  // Remove a plan field
  const removePlanField = (index) => {
    const updatedPlans = packagePlans.filter((_, i) => i !== index);
    setPackagePlans(updatedPlans);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPackage = {
      name: packageName,
      description: packageDescription,
      plans: packagePlans,
      price: packagePrice,
    };
    console.log(newPackage);
    // Here, you can send `newPackage` to your backend API

    fetch(`http://localhost:5000/api/v1/package`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPackage),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset form fields
        setPackageName("");
        setPackageDescription("");
        setPackagePlans([{ plan: "" }]);
        setPackagePrice("");
        toast.success("Package created successfully");
        setPackageRefresh(packageRefresh + 1);
        navigate("/package/all");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add a New Package
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Package Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="packageName"
            >
              Package Name
            </label>
            <input
              type="text"
              id="packageName"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Enter package name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Package Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="packageDescription"
            >
              Package Description
            </label>
            <textarea
              id="packageDescription"
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              placeholder="Enter package description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Package Plans */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Package Plans
            </label>
            {packagePlans.map((plan, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={plan.plan}
                  onChange={(e) => handlePlanChange(index, e.target.value)}
                  placeholder={`Plan ${index + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removePlanField(index)}
                  className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPlanField}
              className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Add Plan
            </button>
          </div>

          {/* Package Price */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="packagePrice"
            >
              Package Price
            </label>
            <input
              type="number"
              id="packagePrice"
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
              placeholder="Enter package price"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddANewPackage;
