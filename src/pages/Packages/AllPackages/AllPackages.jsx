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
import { AuthContext } from "@/Context/UserContext";
import useRefresh from "@/hooks/useRefresh";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const AllPackages = () => {
  const [packages, setPackages] = useState([]); // Store package data
  const [search, setSearch] = useState(""); // Search state
  const { packageRefresh } = useRefresh();
  const { user } = useContext(AuthContext);

  // Fetch packages from API
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/package`) // Adjust API endpoint if necessary
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          setPackages(data.data); // Ensure data structure matches your API response
        }
      })
      .catch((error) => console.error("Error fetching packages:", error));
  }, [packageRefresh]);

  // Filter packages by search input
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full p-5 space-y-10">
      {/* Page Title */}
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold opacity-95">All Packages</h1>
          <p className="font-medium opacity-90">
            Explore all the packages we offer
          </p>
        </div>
        <Input
          className="w-[400px]"
          placeholder="Filter names..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Separator />

      {/* Search Bar */}
      {/* <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search packages by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
        />
      </div> */}

      {/* Packages Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {pkg.name}
                </h2>
                <p className="text-gray-600">{pkg.description}</p>
                <div className="text-xl font-semibold text-indigo-600">
                  ${pkg.price}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-800">Plans:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {pkg.plans.map((plan, index) => (
                      <li key={index}>{plan.plan}</li>
                    ))}
                  </ul>
                </div>

                {user?.role === "admin" ? (
                  <Link
                    to={`/package/single/${pkg._id}`}
                    className="inline-block mt-6 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
                  >
                    View Details
                  </Link>
                ) : (
                  <button className="inline-block mt-6 px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200">
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No packages found.
          </div>
        )}
      </div> */}

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
                {/* Plans List */}
                <div className="mt-4">
                  <ul className="list-disc list-inside text-gray-600">
                    {pkg.plans.map((plan, index) => (
                      <li key={index}>{plan.plan}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                {/* View Details Button */}
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

export default AllPackages;
