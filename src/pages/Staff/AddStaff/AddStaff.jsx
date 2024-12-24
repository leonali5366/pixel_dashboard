import useRefresh from "@/hooks/useRefresh";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "373486347",
    skill: "",
    salary: "",
    salaryType: "",
    startingDate: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { staffRefresh, setStaffRefresh } = useRefresh();

  const skills = [
    "mern developer",
    "seo expert",
    "wordpress developer",
    "shopify developer",
    "wix developer",
    "ppc expert",
    "hosting expert",
  ];

  const salaryTypes = ["monthly", "hourly"];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    setLoading(true);
    setErrors(null);
    e.preventDefault();

    fetch("http://localhost:5000/api/v1/staff/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Staff member added successfully");
          setFormData({
            name: "",
            email: "",
            password: "",
            skill: "",
            salary: "",
            salaryType: "",
            startingDate: "",
          });
          navigate("/staff/all");
          setStaffRefresh(staffRefresh + 1);
        } else {
          setErrors(data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add Staff Member
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter staff name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Skill Selection */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Skill</label>
          <select
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a skill
            </option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Salary (in USD)
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary amount"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Salary Type Selection */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Salary Type
          </label>
          <select
            name="salaryType"
            value={formData.salaryType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select salary type
            </option>
            {salaryTypes.map((type, index) => (
              <option key={index} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Starting Date */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Starting Date
          </label>
          <input
            type="date"
            name="startingDate"
            value={formData.startingDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Error Message */}
        {errors && <p className="text-red-600 text-center">{errors}</p>}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Staff"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
