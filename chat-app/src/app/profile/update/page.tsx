"use client";

import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "@/services/api";
import toast from "react-hot-toast";

export default function UpdateProfile() {
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Token not found");
          return;
        }

        const data = await getProfile(token);
        setNewUsername(data.username);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Token not found");
        return;
      }

      await updateProfile(token, {
        username: newUsername,
        password: newPassword,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 text-black">
      <h2 className="text-2xl font-bold mb-5 text-white">Update Profile</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}
