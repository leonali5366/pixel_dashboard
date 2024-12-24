import { AuthContext } from "@/Context/UserContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const report = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: user.email,
    };

    fetch("http://localhost:5000/api/v1/ticket/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Report submitted successfully!");
          navigate("/");
          e.target.reset();
        } else {
          toast.error("Failed to submit report. Please try again later.");
        }
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 ">Report an Issue</h1>
          <p className="text-gray-600 pt-5">
            {`Have something to report? Fill out the form below, and we'll address it promptly.`}
          </p>
        </div>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Report Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter the report title"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="5"
              name="description"
              placeholder="Describe the issue in detail"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Open Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;
