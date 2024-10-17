// MessageItem.jsx
import React from "react";

const MessageItem = ({ message }) => {
  return (
    <div>
      <p>From: {message.sender.username}</p>
      <p>To: {message.receiver.username}</p>
      <p>{message.content}</p>
      <p>{message.isRead ? "Read" : "Unread"}</p>
    </div>
  );
};

export default MessageItem;
