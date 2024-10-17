Edit
Copy code
// MessageList.jsx
import React, { useState, useEffect } from 'react';
import { fetchWithToken } from '../contexts/SessionContext';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await fetchWithToken('/api/messages');
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      {messages.map(message => (
        <MessageItem key={message._id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;