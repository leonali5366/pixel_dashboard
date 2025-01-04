import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useRefresh from "@/hooks/useRefresh";
import { AuthContext } from "@/Context/UserContext";

const CreateCustomPackageRequest = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    plans: [{ plan: "" }],
    price: "",
    category: "",
    email: user?.email,
  });
  const { packageRefresh, setPackageRefresh } = useRefresh();
  const navigate = useNavigate();

  // Enum for categories
  const categories = [
    "mern",
    "wordpress",
    "shopify",
    "wix",
    "seo",
    "hosting",
    "ppc",
  ];

  // Update form data
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add a new plan field
  const addPlanField = () => {
    setFormData((prev) => ({
      ...prev,
      plans: [...prev.plans, { plan: "" }],
    }));
  };

  // Handle input change for plans
  const updatePlan = (index, value) => {
    const updatedPlans = [...formData.plans];
    updatedPlans[index].plan = value;
    setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  // Remove a plan field
  const removePlanField = (index) => {
    const updatedPlans = formData.plans.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, plans: updatedPlans }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/package/custom`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Custom package request successfully");
        setPackageRefresh(packageRefresh + 1);

        // Reset form fields
        setFormData({
          name: "",
          description: "",
          plans: [{ plan: "" }],
          price: "",
          category: "",
        });
        if (user?.role === "client") {
          navigate("/package/myRequests");
        } else {
          navigate("/package/public/all");
        }
      } else {
        toast.error(data.message || "Failed to request package");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-full p-5">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Create a custom package request
            </CardTitle>
            <CardDescription>
              Here add a custom package request and plans for packages
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Package Name */}
            <label className="max-w-[600px] flex flex-col gap-1">
              <span className="text-sm font-medium opacity-90">
                Package Name
              </span>
              <Input
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Enter package name"
                required
              />
            </label>

            {/* Package Category */}
            <label className="max-w-[600px] flex flex-col gap-1 text-[16px]">
              <span className="text-sm font-medium opacity-90">Category</span>
              <select
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="p-2 border rounded max-w-[600px] text-[16px]"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            {/* Package Description */}
            <label className="max-w-[600px] flex flex-col gap-1">
              <span className="text-sm font-medium opacity-90">
                Package Description
              </span>
              <Textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Enter package description"
                required
              />
            </label>

            {/* Package Plans */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium opacity-90">
                  Package Plans
                </span>
                <div
                  className="p-1 rounded-full hover:bg-slate-100 transition-colors duration-300 ease-in-out cursor-pointer"
                  onClick={addPlanField}
                >
                  <CirclePlus className="opacity-80" size={16} />
                </div>
              </div>
              {formData.plans.map((plan, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={plan.plan}
                    onChange={(e) => updatePlan(index, e.target.value)}
                    placeholder="Enter plan"
                    className="max-w-[600px]"
                    required
                  />
                  <div
                    className="p-1 rounded-full hover:bg-slate-100 transition-colors duration-300 ease-in-out cursor-pointer"
                    onClick={() => removePlanField(index)}
                  >
                    <CircleMinus className="opacity-80" size={16} />
                  </div>
                </div>
              ))}
            </div>

            {/* Package Price */}
            <label className="max-w-[600px] flex flex-col gap-1">
              <span className="text-sm font-medium opacity-90">
                Package Price
              </span>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="Enter package price"
                required
              />
            </label>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-end mt-4">
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Add Package
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CreateCustomPackageRequest;
