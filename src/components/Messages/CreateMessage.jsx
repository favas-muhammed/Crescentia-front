import React, { useState } from "react";
import messageService from "../../services/message.service";

const CreateMessage = ({ conversationId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await messageService.sendMessage(conversationId, { content });
    setContent("");
    // You might want to update the message list after sending
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default CreateMessage;
