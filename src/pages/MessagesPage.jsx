// src/pages/MessagesPage.jsx (updated)
import React, { useState, useEffect } from "react";
import MessageList from "../components/Messages/MessageList";
import CreateMessage from "../components/Messages/CreateMessage";
import messageService from "../services/message.service";

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const fetchedConversations = await messageService.getConversations();
      setConversations(fetchedConversations);
    };
    fetchConversations();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <div>
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation)}
          >
            {conversation.name || conversation.participants.join(", ")}
          </div>
        ))}
      </div>
      {selectedConversation && (
        <div>
          <MessageList conversationId={selectedConversation.id} />
          <CreateMessage conversationId={selectedConversation.id} />
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
