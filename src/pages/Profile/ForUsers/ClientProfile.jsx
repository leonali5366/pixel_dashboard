/* eslint-disable no-unused-vars */
import { AuthContext } from "@/Context/UserContext";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa"; // Import edit icon

const ProfilePage = () => {
  const { user, setUser, refresh, setRefresh } = useContext(AuthContext);
  const [client, setClient] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    photo: "",
  });
  const [photoLoading, setPhotoLoading] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [showEditPhotoForm, setShowEditPhotoForm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");

  // Fetch client profile
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/v1/client/single/byEmail?email=${user?.email}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClient(data?.client);
        setPhotoPreview(data?.client.photo || "https://github.com/shadcn.png");
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [user?.email]);

  // Handle Client Data Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedClient = {
      ...client,
      // Ensure client data includes photo, name, phone, etc.
      photo: photoPreview, // assuming you handle photo preview logic
    };

    fetch("http://localhost:5000/api/v1/client/update/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedClient),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "success") {
          toast.success("Client updated successfully");
        } else {
          toast.error("Failed to update client profile");
        }
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handlePhotoUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const photo = e.target.photo.files[0]; // Get the uploaded file

    const photoData = new FormData();
    photoData.append("file", photo);
    photoData.append("upload_preset", "test-upload");
    photoData.append("cloud_name", "dqeuy96cs");

    // Upload photo to Cloudinary
    fetch("https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload", {
      method: "POST",
      body: photoData,
    })
      .then((res) => res.json())
      .then((data) => {
        const photoUrl = data?.url; // Get the URL of the uploaded photo
        if (photoUrl) {
          // Send the updated photo URL to the backend
          const updateData = {
            email: user?.email, // Assuming you have access to the user email
            photo: photoUrl,
          };
          console.log(updateData);

          fetch("http://localhost:5000/api/v1/client/update/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json", // Set Content-Type to application/json
            },
            body: JSON.stringify(updateData), // Send data as JSON
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                toast.success("Profile photo updated successfully!");
                setShowEditPhotoForm(false);
                setUser({...user, name: null });
                setRefresh(refresh + 1);
              }
            })
            .catch((error) => {
              console.error("Error updating profile photo:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-800 rounded-lg">
      {/* Profile Photo Section */}
      <div className="flex justify-center mb-6 relative">
        <div className="relative">
          <img
            src={
              client?.photo ? client?.photo : "https://github.com/shadcn.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
          <button
            onClick={() => setShowEditPhotoForm(!showEditPhotoForm)}
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            <FaPen />
          </button>
        </div>
      </div>

      {/* Edit Photo Form (Visible when clicked on Edit button) */}
      {showEditPhotoForm && (
        <form onSubmit={handlePhotoUpload} className="mb-6">
          <div>
            <label className="block text-sm mb-2">Upload New Photo</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              className="text-sm text-gray-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          >
            Upload Photo
          </button>
        </form>
      )}

      {/* Profile Info Form */}
      <form onSubmit={handleUpdate}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={client?.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
              className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={client?.email}
              readOnly
              className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              value={client?.phoneNumber}
              onChange={(e) =>
                setClient({ ...client, phoneNumber: e.target.value })
              }
              className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={client?.address}
              onChange={(e) =>
                setClient({ ...client, address: e.target.value })
              }
              className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
