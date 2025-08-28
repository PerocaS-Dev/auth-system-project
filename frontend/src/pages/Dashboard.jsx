import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // helper: get token + role
  const getAuthData = () => {
    const stored = localStorage.getItem("user");
    if (!stored) return {};
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  };

  // fetch all users
  const fetchUsers = async () => {
    try {
      const { accessToken, user } = getAuthData();

      if (!accessToken) {
        throw new Error("No access token found. Please log in.");
      }

      console.log("Logged-in role:", user?.role); // debug

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/users`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");

      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // delete a user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const { accessToken } = getAuthData();

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");

      // update UI: remove deleted user
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const backToHome = () => {
    navigate("/home");
  };

  if (loading) return <p className="text-brand-gray_green">Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-2/3 h-full border-2 border-brand-gray_green bg-brand-lighter_orange rounded-md my-10 flex items-center flex-col py-5">
        <h1 className="text-3xl text-brand-gray_green mb-5 font-bold">
          Admin Dashboard
        </h1>
        <div className="w-full h-auto px-5 overflow-x-auto">
          <table className="table-auto border-2 border-brand-gray_green w-full">
            <thead>
              <tr className="h-10 bg-brand-gray_green text-brand-lighter_orange">
                <th className="border-r-2 border-brand-lighter_orange px-5">
                  Firstname
                </th>
                <th className="border-r-2 border-brand-lighter_orange px-5">
                  Lastname
                </th>
                <th className="border-r-2 border-brand-lighter_orange px-5">
                  Username
                </th>
                <th className="border-r-2 border-brand-lighter_orange px-5">
                  Email
                </th>
                <th className="border-r-2 border-brand-lighter_orange px-5">
                  Contact
                </th>
                <th className="border-r-2 border-brand-lighter_orange px-5">
                  Role
                </th>
                <th className="px-5">Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="text-center border-t border-brand-gray_green"
                >
                  <td className="px-5">{user.name}</td>
                  <td className="px-5">{user.surname}</td>
                  <td className="px-5">{user.username}</td>
                  <td className="px-5">{user.email}</td>
                  <td className="px-5">{user.contact || "-"}</td>
                  <td className="px-5">{user.role}</td>
                  <td className="px-5">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          onClick={backToHome}
          className="w-48 h-12 mt-5 border rounded-md bg-brand-gray_green text-brand-lighter_orange font-bold"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
