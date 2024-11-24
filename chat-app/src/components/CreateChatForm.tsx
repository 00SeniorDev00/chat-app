"use client";

import React, { useState } from "react";
import { createChat } from "@/services/api";
import toast from "react-hot-toast";

export default function CreateChatForm() {
  const [participants, setParticipants] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Token not found");
        return;
      }

      await createChat(token, {
        participants: participants.split(",").map((p) => p.trim()),
      });
      toast.success("Chat created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Chat creation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 text-black">
      <h2 className="text-2xl font-bold mb-5 text-white">Create Chat</h2>
      <div className="mb-4">
        <label htmlFor="participants" className="block text-white">
          Participants
        </label>
        <input
          type="text"
          id="participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-3 bg-blue-500 text-white rounded-md"
      >
        Create Chat
      </button>
    </form>
  );
}
