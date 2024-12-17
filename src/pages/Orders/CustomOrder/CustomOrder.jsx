import { AuthContext } from "@/Context/UserContext";
import useRefresh from "@/hooks/useRefresh";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const CustomOrder = () => {
  const { user } = useContext(AuthContext);
  const { orderRefresh, setOrderRefresh } = useRefresh();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: user?.email,
    service: "",
    requirements: "",
    assets: "",
    deadline: "",
    budget: "",
    technology: null,
    needHosting: false,
    hasHost: false,
    ppcPlatforms: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePPCChange = (e) => {
    const { value, checked } = e.target;
    const updatedPlatforms = checked
      ? [...formData.ppcPlatforms, value]
      : formData.ppcPlatforms.filter((platform) => platform !== value);
    setFormData({ ...formData, ppcPlatforms: updatedPlatforms });
  };

  const handleSubmit = (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();

    // Simulate API call for submitting the order
    fetch("http://localhost:5000/api/v1/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.status == "success") {
          toast.success("Order submitted successfully");
          setFormData({
            service: "",
            requirements: "",
            assets: "",
            deadline: "",
            budget: "",
            technology: "",
            needHosting: false,
            hasHost: false,
            ppcPlatforms: [],
          });
          setOrderRefresh(orderRefresh + 1);
          navigate("/order/client/myOrder");
          window.scrollTo(0, 0);
        } else {
          setError(data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Custom Order</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-600 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            required
            readOnly
          />
        </div>

        {/* Service Selection */}
        <div>
          <label
            htmlFor="service"
            className="block text-gray-600 font-medium mb-2"
          >
            Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="development">Web Development</option>
            <option value="seo">SEO</option>
            <option value="ppc">PPC</option>
            <option value="hosting">Hosting</option>
          </select>
        </div>

        {/* Conditional Fields for Web Development */}
        {formData.service === "development" && (
          <>
            <div>
              <label
                htmlFor="technology"
                className="block text-gray-600 font-medium mb-2"
              >
                Technology
              </label>
              <select
                id="technology"
                name="technology"
                value={formData.technology}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>
                  Select technology
                </option>
                <option value="mern">MERN</option>
                <option value="wordpress">WordPress</option>
                <option value="shopify">Shopify</option>
                <option value="wix">Wix</option>
                <option value="custom">Wix</option>
              </select>
            </div>

            {/* Hosting Question */}
            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">
                Do you need hosting?
              </label>
              <input
                type="checkbox"
                name="needHosting"
                checked={formData.needHosting}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-gray-600">Yes</span>
            </div>

            {formData.needHosting && (
              <div className="mt-4">
                <label className="block text-gray-600 font-medium mb-2">
                  Do you have a host?
                </label>
                <input
                  type="checkbox"
                  name="hasHost"
                  checked={formData.hasHost}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-gray-600">Yes</span>
              </div>
            )}
          </>
        )}

        {/* Conditional Fields for PPC */}
        {formData.service === "ppc" && (
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Platforms
            </label>
            <div className="space-y-2">
              {["Google", "Instagram", "Facebook"].map((platform) => (
                <label key={platform} className="block text-gray-600">
                  <input
                    type="checkbox"
                    value={platform}
                    checked={formData.ppcPlatforms.includes(platform)}
                    onChange={handlePPCChange}
                  />
                  <span className="ml-2">{platform}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Hosting Question */}
        {formData.service === "hosting" && (
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Do you have hosting?
            </label>
            <input
              type="checkbox"
              name="hasHost"
              checked={formData.hasHost}
              onChange={handleInputChange}
            />
            <span className="ml-2 text-gray-600">Yes</span>
          </div>
        )}

        {/* Requirements */}
        <div>
          <label
            htmlFor="requirements"
            className="block text-gray-600 font-medium mb-2"
          >
            Requirements
          </label>
          <textarea
            type="text"
            id="requirements"
            name="requirements"
            onChange={handleInputChange}
            placeholder="Describe your requirements"
            className="w-full p-3 bg-white border border-gray-300 h-[150px] rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Assets */}
        <div>
          <label
            htmlFor="assets"
            className="block text-gray-600 font-medium mb-2"
          >
            Assets (Drive Link Only)
          </label>
          <input
            type="text"
            id="assets"
            name="assets"
            value={formData.assets}
            onChange={handleInputChange}
            placeholder="Enter Drive link"
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-gray-600 font-medium mb-2"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Budget */}
        <div>
          <label
            htmlFor="budget"
            className="block text-gray-600 font-medium mb-2"
          >
            Budget (in USD)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Enter your budget"
            className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <p className="text-red-600 text-center my-1">{error}</p>
        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-green-600 transition duration-300 w-full max-w-[600px] text-center"
          >
            <div className="flex items-center justify-center">
              {loading && (
                <ClipLoader size={20} color="white" className="ml-3" />
              )}{" "}
              <span>Submit Order</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomOrder;
