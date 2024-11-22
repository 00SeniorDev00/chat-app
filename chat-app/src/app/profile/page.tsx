"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/services/api";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState<{ username: string }>({
    username: "",
  });
  const [loading, setLoading] = useState(true);

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
        setProfile(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 text-black">
      <h2 className="text-2xl font-bold mb-5 text-white">Profile</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="text-white">
          <p>
            <strong>Username:</strong> {profile.username}
          </p>
        </div>
      )}
    </div>
  );
}
