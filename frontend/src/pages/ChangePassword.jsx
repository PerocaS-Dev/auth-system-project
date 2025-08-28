import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ChangePassword = () => {
  const { accessToken } = useAuthContext();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.oldPassword &&
      formData.newPassword &&
      formData.oldPassword === formData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from old password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        alert("Password updated successfully!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/profile"); // Redirect to profile
      } else {
        alert(`Update failed: ${json.error}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while saving changes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const backToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center justify-center flex-col py-5 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold">
          Change Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-5"
        >
          {/* Old Password */}
          <div className="relative w-3/6">
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
              Enter old password
            </label>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative w-3/6">
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
              Enter new password
            </label>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative w-3/6">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
              Confirm new password
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-1/2 h-12 py-2 rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand-light_orange text-brand-gray_green cursor-pointer"
            }`}
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>

          <button
            type="button"
            onClick={backToProfile}
            className="text-brand-light_orange font-bold hover:underline cursor-pointer"
          >
            Back to Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
