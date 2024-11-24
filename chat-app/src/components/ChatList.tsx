"use client";

import React, { useState, useEffect } from "react";
import { getChats } from "@/services/api";
import toast from "react-hot-toast";

export default function ChatList() {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<string[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Token not found");
          return;
        }

        const data = await getChats(token);
        setChats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 text-black">
      <h2 className="text-2xl font-bold mb-5 text-white">Chats</h2>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat} className="text-white">
              {chat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
