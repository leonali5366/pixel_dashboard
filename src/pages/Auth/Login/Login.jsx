/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
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
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "@/Context/UserContext";
const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromUser, setFromUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    fetch(`http://localhost:5000/api/v1/client/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fromUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Login successful");
          setUser(data.clientData); // Update user state
          localStorage.setItem("pxileToken", data.token);
          localStorage.setItem("pxileClient", JSON.stringify(data.clientData));
          navigate("/"); // Redirect after login
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setError("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-auto">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Client Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 mt-3">
                <label htmlFor="email">Email</label>
                <Input
                  onChange={(e) => {
                    setFromUser({ ...fromUser, email: e.target.value });
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
                    setFromUser({ ...fromUser, password: e.target.value });
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
                {loading && <ClipLoader size={20} color="white" />} Login
              </Button>
              <div className="flex items-center gap-2 mt-5">
                {`Don't have an account?`}
                <Link to="/auth/signup" className="hover:underline">
                  Signup
                </Link>
              </div>
              
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
