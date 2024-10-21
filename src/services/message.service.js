import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const messageService = {
  getConversations: async () => {
    const response = await axios.get(`${API_URL}/conversations`);
    return response.data;
  },

  getMessages: async (conversationId) => {
    const response = await axios.get(
      `${API_URL}/conversations/${conversationId}/messages`
    );
    return response.data;
  },

  sendMessage: async (conversationId, data) => {
    const response = await axios.post(
      `${API_URL}/conversations/${conversationId}/messages`,
      data
    );
    return response.data;
  },

  createConversation: async (participants) => {
    const response = await axios.post(`${API_URL}/conversations`, {
      participants,
    });
    return response.data;
  },
};

export default messageService;
