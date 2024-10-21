import React, { useState, useEffect } from "react";
import messageService from "../../services/message.service";

const MessageList = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await messageService.getMessages(conversationId);
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, [conversationId]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <strong>{message.sender.name}: </strong>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
