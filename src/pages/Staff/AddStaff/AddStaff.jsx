import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useRefresh from "@/hooks/useRefresh";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "123456", // Default password
    skill: "",
    salary: "",
    salaryType: "",
    startingDate: "",
  });

  console.log(formData);
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
    "graphic designer",
    "digital marketer",
    "content writer",
    "video editor",
  ];

  const salaryTypes = ["monthly", "hourly"];

  // Handle form input changes
  const handleChange = (value) => {
    setFormData({ ...formData, skill: value });
  };
  const handleSalaryChange = (value) => {
    setFormData({ ...formData, salaryType: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    setLoading(true);
    setErrors(null);
    e.preventDefault();

    console.log(formData);

    fetch("http://localhost:5000/api/v1/client/create/staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
      .catch((error) => {
        setErrors(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 mb-20">
      {/* Page Title */}
      <CardHeader>
        <CardTitle>Add Staff Member</CardTitle>
      </CardHeader>
      <Separator />

      {/* Form */}
      <CardContent className="mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-90">Name</span>
            <Input
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter staff name"
              required
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-90">Email</span>
            <Input
              type="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email address"
              required
            />
          </label>

          {/* Skill Selection */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-90">Skill</span>
            <Select onValueChange={handleChange} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Skills</SelectLabel>
                  {skills.map((skill, i) => {
                    return (
                      <SelectItem value={skill} key={i}>
                        {skill}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>

          {/* Salary */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-90">
              Salary (in USD)
            </span>
            <Input
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              placeholder="Enter salary amount"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-90">Salary Type</span>
            <Select onValueChange={handleSalaryChange} required>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select salary type" />
              </SelectTrigger>
              <SelectContent>
                {salaryTypes.map((skill, i) => {
                  return (
                    <SelectItem value={skill} key={i} className="capitalize">
                      {skill}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </label>

          

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-90">
              Starting Date
            </span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !formData.startingDate && "text-muted-foreground"
                  )}
                >
                  {formData.startingDate ? (
                    format(formData.startingDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  required
                  mode="single"
                  selected={formData.startingDate}
                  onSelect={(e) =>
                    setFormData({ ...formData, startingDate: e })
                  }
                  initialFocus
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </label>

          {/* Error Message */}
          {errors && <p className="text-red-600 text-center">{errors}</p>}

          {/* Submit Button */}
          <div className="text-center mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Add Staff"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStaff;
