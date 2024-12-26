/* eslint-disable no-unused-vars */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { ArrowLeftToLine, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

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

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isAddPlanLoading, setIsAddPlanLoading] = useState(false);
  const navigate = useNavigate();

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
    setIsFormLoading(true);
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
    setIsFormLoading(false);
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    setIsAddPlanLoading(true);
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
    setIsAddPlanLoading(false);
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
    <div className="p-5 space-y-10">
      <div className="flex items-center gap-3">
        <ArrowLeftToLine
          onClick={() => navigate("/package/all")}
          className="cursor-pointer"
        />
        <span className="text-xl font-bold opacity-98">
          Edit Package: {pkg.name || "Loading..."}
        </span>
      </div>

      {/* Update Package Form */}
      <form onSubmit={handleFormSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Package</CardTitle>
            <CardDescription>
              Change Name, Description and Price
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <label className="max-w-[600px] flex flex-col gap-1">
              <span className="text-sm font-medium opacity-90">Name</span>
              <Input
                type="text"
                defaultValue={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>
            <label className="max-w-[600px] flex flex-col gap-1">
              <span className="text-sm font-medium opacity-90">
                Description
              </span>
              <Textarea
                defaultValue={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </label>
            <label className="max-w-[600px] flex flex-col gap-1">
              <span className="text-sm font-medium opacity-90">Price</span>
              <Input
                type="number"
                defaultValue={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </label>
          </CardContent>
          <Separator />
          <CardFooter className="mt-4 w-full flex justify-end">
            <Button type="submit" disabled={isFormLoading}>
              {isFormLoading ? <Loader className="animate-spin" /> : "Update"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Add New Plan Form */}

      <form onSubmit={handleAddPlan}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Add New Plan</CardTitle>
            <CardDescription>Add a new plan to the package</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              onChange={(e) =>
                setNewPlan({ ...newPlan, price: e.target.value })
              }
              placeholder="Enter plan name.."
              className="max-w-[600px]"
            />
          </CardContent>
          <Separator />
          <CardFooter className="mt-4 w-full flex justify-end">
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              disabled={isAddPlanLoading}
            >
              {isAddPlanLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Add Plan"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {pkg.plans && (
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-xl">All Plans</CardTitle>
            <CardDescription>Delete plan for {pkg.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {pkg.plans?.map((plan, i) => {
              return (
                <div
                  key={i}
                  className="w-full flex items-center justify-between gap-5"
                >
                  <Input defaultValue={plan.plan} disabled />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this plan and remove data from servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePlan(plan._id)}
                        >
                          Countinue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Plans List */}
      {/* {pkg.plans && pkg.plans.length > 0 && (
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
      )} */}
    </div>
  );
};

export default SinglePackage;
