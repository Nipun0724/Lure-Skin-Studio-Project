import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let isMounted = true;  // flag to track component mounting status
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in");
      }

      const response = await axios.get("http://localhost:5001/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (isMounted) {
        setUser(response.data);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.response?.data?.message || "Error fetching user data");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchUserData();

  return () => { isMounted = false; }; // cleanup function
}, []);


  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="profile-container bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 min-h-screen flex items-center justify-center">
      <section className="container mx-auto px-6 py-12">
        <div className="flex justify-center">
          <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-md w-full transition-transform transform hover:-translate-y-2 duration-300 hover:shadow-2xl hover:border-pink-400 border border-transparent">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-pink-400 blur-xl opacity-20 rounded-lg z-[-1]"></div>
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
              Profile Details
            </h2>
            <div className="space-y-4">
              <div className="text-lg font-medium text-gray-600">
                <strong className="block text-gray-800">Full Name:</strong>
                {user.name}
              </div>
              <div className="text-lg font-medium text-gray-600">
                <strong className="block text-gray-800">Email Address:</strong>
                {user.email}
              </div>
              <div className="text-lg font-medium text-gray-600">
                <strong className="block text-gray-800">Address:</strong>
                {user.address}
              </div>
              <div className="text-lg font-medium text-gray-600">
                <strong className="block text-gray-800">Phone Number:</strong>
                {user.phone}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;

