// Continuing from CreateMessage.jsx

import React, { useState } from "react";
import { fetchWithToken } from "../contexts/SessionContext";

const CreateMessage = () => {
  const [receiver, setReceiver] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMessage = await fetchWithToken("/api/messages", "POST", {
        receiver,
        content,
      });
      console.log("New message sent:", newMessage);
      // Reset form or update message list
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        placeholder="Receiver's username"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message content"
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default CreateMessage;
