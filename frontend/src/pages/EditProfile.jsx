import React, { useRef, useState, useEffect } from "react";
import profile from "../assets/pink-profile.png";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // import hook

const EditProfile = () => {
  const { accessToken } = useAuthContext(); // get token from context
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("null");
  const [formData, setFormData] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!accessToken) return; // wait for token before fetching

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // from context
            },
          }
        );

        const json = await response.json();

        if (response.ok) {
          setUser(json);
          setFormData({
            display: json.display || profile,
            name: json.name || "",
            surname: json.surname || "",
            contact: json.contact || "Add Contact",
          });
        } else {
          console.error("Failed to load profile:", json.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUser();
  }, [accessToken]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Compare to original user values to track "dirty"
    const dirty =
      user.display !== updatedFormData.display ||
      user.name !== updatedFormData.name ||
      user.surname !== updatedFormData.surname ||
      user.contact !== updatedFormData.contact;

    setIsDirty(dirty);
  };

  const handleSave = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const json = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
        setUser(json);
        setIsDirty(false);
      } else {
        alert(`Update failed: ${json.message}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while saving changes.");
    }
  };

  const backToProfile = () => {
    navigate("/profile");
  };

  const changePassword = () => {
    navigate("/change-password");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Prepare FormData
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "profile_uploads"); // use your preset
    // data.append("cloud_name", "dlelinrxx"); //  from dashboard

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dlelinrxx/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();

      if (uploaded.secure_url) {
        // Save hosted URL to formData
        setFormData({
          ...formData,
          display: uploaded.secure_url,
        });
        setIsDirty(true);
      } else {
        console.error("Upload failed:", uploaded);
        alert("Image upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed.");
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center flex-col py-5 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold ">
          Edit Profile
        </h1>
        <div className="flex w-full flex-col items-center gap-5">
          <img
            src={formData.display || profile}
            alt=""
            className="border-2 border-black rounded-full w-32 h-32"
          />

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <h3
            onClick={triggerFileSelect}
            className="text-brand-light_orange font-bold hover:underline cursor-pointer"
          >
            Edit
          </h3>
          {/* FIRSTNAME */}
          <div className="relative w-3/6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
              First name
            </label>
          </div>

          {/* LASTNAME */}
          <div className="relative w-3/6">
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
              Last name
            </label>
          </div>

          {/* CONTACT */}
          <div className="relative w-3/6">
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
              Contact
            </label>
          </div>

          <button
            onClick={changePassword}
            type="submit"
            className="peer w-1/2 h-12 rounded-md border-2 bg-brand-lighter_orange text-brand-gray_green font-bold flex items-center justify-center cursor-pointer"
          >
            Change Password
          </button>

          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={` w-1/2 h-12 py-2 rounded ${
              isDirty
                ? "bg-brand-light_orange text-brand-gray_green cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>

          <h3
            onClick={backToProfile}
            className="text-brand-light_orange font-bold hover:underline cursor-pointer"
          >
            Back
          </h3>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
