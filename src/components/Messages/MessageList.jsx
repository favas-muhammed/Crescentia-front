import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import MessageItem from "./MessageItem";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const { fetchWithToken } = useContext(SessionContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchWithToken("/api/messages");
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [fetchWithToken]);

  return (
    <div>
      <h2>Messages</h2>
      {messages.map((message) => (
        <MessageItem key={message._id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
