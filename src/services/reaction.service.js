import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const reactionService = {
  addReaction: async (postId, reactionType) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/reactions`, {
      type: reactionType,
    });
    return response.data;
  },

  removeReaction: async (postId, reactionType) => {
    await axios.delete(`${API_URL}/posts/${postId}/reactions/${reactionType}`);
  },
};

export default reactionService;
