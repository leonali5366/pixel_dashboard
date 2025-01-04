import  { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const ClientSinglePage = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/v1/client/single/byEmail?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setClient(data?.client || {});
        setAboutMe(data?.client?.aboutMe || "");
      })
      .catch(() => setError("Failed to load client details. Please try again."))
      .finally(() => setLoading(false));
  }, [email]);

  const handleUpdateAboutMe = () => {
    fetch(`http://localhost:5000/api/v1/client/update/aboutMe`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, aboutMe }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("About Me updated successfully.");
      })
      .catch(() => toast.error("Failed to update About Me."));
  };

  if (loading) {
    return <div className="text-center mt-10">Loading client details...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Client Details</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-3xl mx-auto">
        <img
          src={client.photo || "https://via.placeholder.com/300"}
          alt={client.name || "Client Photo"}
          className="w-full h-[300px] object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {client.name || "N/A"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {client.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {client.phoneNumber || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span> {client.address || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Gender:</span> {client.gender || "N/A"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span> {client.role || "N/A"}
            </p>
            <p
              className={`text-sm font-semibold ${
                client.status === "active" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {client.status || "N/A"}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
            <textarea
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              rows={4}
              className="p-2 border rounded-md w-full mb-2"
              placeholder="Write something about the client..."
            />
            
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Social Links</h3>
            <ul>
              {client.social?.map((social, index) => (
                <li key={index} className="text-gray-700 mb-1">
                  <span className="font-semibold capitalize">{social.name}:</span>{" "}
                  <a
                    href={social.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {social.link || "N/A"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to={`/profile/client/${email}`}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 block text-center"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientSinglePage;
