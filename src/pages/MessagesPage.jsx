import React from "react";
import MessageList from "../components/Messages/MessageList";
import CreateMessage from "../components/Messages/CreateMessage";

const MessagesPage = () => {
  return (
    <div>
      <h1>Messages</h1>
      <CreateMessage />
      <MessageList />
    </div>
  );
};

export default MessagesPage;
