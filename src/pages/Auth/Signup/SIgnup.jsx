/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(user);

    fetch(`http://localhost:5000/api/v1/client/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          navigate("/auth/login");
          toast.success(
            "Sign up successful please check your confirmation email"
          );
          setLoading(false);
          setUser({ email: "", password: "" });
        } else {
          setError(data.message);
          setLoading(false);
        }
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen my-auto">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name">Name</label>
                <Input
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-3">
                <label htmlFor="email">Email</label>
                <Input
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5 my-3 mb-10">
                <label htmlFor="name">Password</label>
                <Input
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  type="password"
                  placeholder="Your Password"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex flex-col justify-center">
              {error && (
                <p className="text-red-600 text-center mb-2">{error}</p>
              )}
              <Button
                type="submit"
                className={`w-full ${loading ? "disabled" : ""}`}
              >
                {loading && <ClipLoader size={20} color="white" />} Sign Up
              </Button>
              <div className="flex items-center gap-2 mt-5">
                {`Already have an account?`}
                <Link to="/auth/login" className="hover:underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
