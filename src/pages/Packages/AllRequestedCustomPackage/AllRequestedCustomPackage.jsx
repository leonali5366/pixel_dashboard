/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
const AllRequestedCustomPackage = () => {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { packageRefresh } = useRefresh();
  const { user } = useContext(AuthContext);

  // Fetch packages and categories from the API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/package/custom/approved`
        );
        const data = await response.json();
        if (data.status === "success" && data.data) {
          setPackages(data.data);

          // Extract unique categories from the fetched packages
          const uniqueCategories = [
            "all",
            ...new Set(data.data.map((pkg) => pkg.category)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, [packageRefresh]);

  // Filter packages based on the selected category
  const filteredPackages =
    selectedCategory === "all"
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);
  return (
    <div className="h-full p-5 space-y-10">
      {/* Page Title */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold opacity-95">All Custom Packages</h1>
          <p className="font-medium opacity-90">
            Explore all the packages we offer
          </p>
        </div>
        <div>
          {/* Dropdown for Category Filtering */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-[200px] px-3 py-2 border rounded-md text-sm bg-white shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Separator />

      {/* Package Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <Card key={pkg._id} className="flex flex-col justify-between">
              <CardHeader className="text-center border-b">
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <span className="text-sm font-semibold opacity-95">
                  ${pkg.price}
                </span>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                {/* Category */}
                <div>
                  <span className="text-xs font-medium opacity-80">
                    Category:
                  </span>
                  <p className="text-sm font-semibold text-gray-700">
                    {pkg.category}
                  </p>
                </div>

                {/* Plans */}
                <div className="mt-4">
                  <span className="text-xs font-medium opacity-80">Plans:</span>
                  <ul className="list-disc list-inside text-gray-600">
                    {pkg.plans?.length > 0 ? (
                      pkg.plans.map((plan, index) => (
                        <li key={index}>{plan.plan}</li>
                      ))
                    ) : (
                      <li>No plans available</li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                {/* Admin View Details or Buy Now */}
                {user?.role === "admin" ? (
                  <Link to={`/package/single/${pkg._id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      View Details
                    </Button>
                  </Link>
                ) : (
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Buy Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No packages found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequestedCustomPackage;
