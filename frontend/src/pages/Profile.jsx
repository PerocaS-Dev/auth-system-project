import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import userLogout from "../hooks/userLogout";

const Profile = () => {
  const [user, setUser] = useState("");
  const { logout } = userLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.accessToken;

        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await response.json();

        if (response.ok) {
          setUser(json);
        } else {
          console.log("Failed to fetch this user", json.message);
        }
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };
    fetchUser();
  }, []);

  const goToEdit = () => {
    navigate("/edit-profile");
  };

  const logoutUser = () => {
    logout();
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="w-full h-full bg-brand-light_orange flex justify-center items-center py-5">
      <div className="w-1/3 h-full border-2 rounded-lg border-brand-gray_green flex items-center flex-col py-2 ">
        <img
          src={user.display}
          alt=""
          className="border-2 border-black rounded-full my-5 w-32 h-32"
        />
        <h1 className="text-3xlmb-5 font-bold mb-10 text-3xl text-brand-gray_green">
          {user.username}
        </h1>
        <div className="flex w-full flex-col items-center gap-5">
          <div className=" w-full flex items-start flex-col">
            <div className=" w-full h-12 px-5 text-2xl flex items-center justify-between cursor-pointer">
              <span className="text-gray-400">Name</span>
              <span className="text-brand-gray_green">{user.name}</span>
            </div>
            <div className=" w-full h-12 px-5 text-2xl flex items-center justify-between cursor-pointer">
              <span className="text-gray-400">Surname</span>
              <span className="text-brand-gray_green">{user.surname}</span>
            </div>
            <div className=" w-full h-12 px-5 text-2xl flex items-center justify-between cursor-pointer">
              <span className="text-gray-400">Email</span>
              <span className="text-brand-gray_green">{user.email}</span>
            </div>
            <div className=" w-full h-12 px-5 text-2xl flex items-center justify-between cursor-pointer">
              <span className="text-gray-400">Role</span>
              <span className="text-brand-gray_green">{user.role}</span>
            </div>
          </div>
          <div className=" w-full flex items-start flex-col">
            <div
              onClick={goToEdit}
              className=" w-full h-16 px-5 text-2xl border-y-2 border-brand-gray_green text-brand-gray_green flex items-center cursor-pointer hover:bg-brand-light_red"
            >
              Edit Profile
            </div>
            <div
              onClick={logoutUser}
              className=" w-full h-16 px-5 text-2xl border-b-2 border-brand-gray_green text-brand-gray_green flex items-center cursor-pointer hover:bg-brand-light_red"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
