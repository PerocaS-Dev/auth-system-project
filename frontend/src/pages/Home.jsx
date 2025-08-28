import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
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

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const vowelList = ["a", "e", "i", "o", "u"];

  if (!user) return <p>Loading...</p>;

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center justify-center flex-col py-2 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold ">
          Hi, {user.username}
        </h1>
        <h1 className="text-2xl text-brand-lighter_orange mb-10 ">
          You are {vowelList.includes(user.role[0].toLowerCase()) ? "an" : "a"}{" "}
          {user.role}.
        </h1>
        <div className="flex w-full flex-col items-center gap-5">
          <button
            onClick={goToProfile}
            className="peer w-1/2 h-12 rounded-md border-2 bg-brand-lighter_orange text-brand-gray_green font-bold flex items-center justify-center cursor-pointer"
          >
            View Profile
          </button>

          {user.role == "admin" && (
            <button
              onClick={goToDashboard}
              className="peer w-1/2 h-12 rounded-md border-2 bg-brand-lighter_orange text-brand-gray_green font-bold flex items-center justify-center cursor-pointer"
            >
              View Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
