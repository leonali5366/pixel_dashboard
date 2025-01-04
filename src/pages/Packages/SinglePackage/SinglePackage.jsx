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
  const [client, setClient] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [newPlan, setNewPlan] = useState("");
  const { packageRefresh, setPackageRefresh } = useRefresh();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isAddPlanLoading, setIsAddPlanLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/package/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPkg(data.data);
        setClient(data.client);
        setFormData({
          name: data.data.name || "",
          description: data.data.description || "",
          price: data.data.price || "",
        });
      });
  }, [id, packageRefresh]);

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
        setPackageRefresh(packageRefresh + 1);
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
        setPackageRefresh(packageRefresh + 1);
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
        setPackageRefresh(packageRefresh + 1);
      })
      .catch((err) => alert("Error deleting plan"));
  };

  const handlePackageDelete = () => {
    fetch(`http://localhost:5000/api/v1/package/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Package deleted successfully!");
        navigate("/package/public/all");
        setPackageRefresh(packageRefresh + 1);
      })
      .catch((err) => alert("Error deleting package"));
  };

  const handleCustomPackageAccept = () => {
    fetch(`http://localhost:5000/api/v1/package/custom/accept/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Package accepted successfully!");
        navigate("/package/public/all");
        setPackageRefresh(packageRefresh + 1);
      })
      .catch((err) => alert("Error accepting package"));
  };
  const handleCustomPackageReject = () => {
    fetch(`http://localhost:5000/api/v1/package/custom/reject/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Package reject successfully!");
        navigate("/package/public/all");
        setPackageRefresh(packageRefresh + 1);
      })
      .catch((err) => alert("Error rejecting package"));
  };

  return (
    <div className="p-5 space-y-10">
      <div className="flex items-center gap-3">
        <ArrowLeftToLine
          onClick={() => navigate("/package/public/all")}
          className="cursor-pointer"
        />
        <span className="text-xl font-bold opacity-98">
          Edit Package: {pkg.name || "Loading..."}
        </span>
      </div>

      {/* Client Details */}
      <div
        className={`bg-gray-50 p-6 space-y-6 ${
          pkg?.request === false ? "hidden" : ""
        }`}
      >
        {/* Client Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <div className="flex items-start gap-6">
            <img
              src={client?.photo || "https://via.placeholder.com/150"}
              alt="Client"
              className="w-24 h-24 rounded-full"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  {client?.name || "Loading..."}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {client?.email || "Email not available"}
                </p>
                <p className="text-gray-600 text-sm">
                  {client?.phone || "Phone not available"}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {client?.address || "Address not available"}
                </p>
              </div>
              <button
                onClick={() => alert(`Going to ${client.name}'s profile...`)}
                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Package Form */}
      <form onSubmit={handleFormSubmit}>
        <Card>
          <div className="flex justify-between items-center w-full">
            <CardHeader>
              <CardTitle className="text-xl">Package</CardTitle>
              <CardDescription>
                Change Name, Description and Price
              </CardDescription>
            </CardHeader>
            <CardHeader>
              <p className="text-gray-900 text-sm flex ">
                <p className="font-semibold mr-2">Status :</p>{" "}
                {pkg?.status || "Address not available"}
              </p>
            </CardHeader>
          </div>
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

      {/* Delete A plan Button for packages*/}
      <div className={pkg?.request === false ? "block" : "hidden"}>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">Delete Package</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                package and remove data from servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handlePackageDelete();
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Delete A plan Reject for custom packages*/}
      <div
        className={`${pkg?.request === true ? "block" : "hidden"} ${
          pkg?.status === "approved" ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">
            What action would you like to take?
          </h3>
          <p className="text-sm text-gray-600">
            Please choose an appropriate action for this package. This action
            cannot be undone.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                handleCustomPackageAccept();
              }}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                handleCustomPackageReject();
              }}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Reject
            </button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Send To Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePackage;
