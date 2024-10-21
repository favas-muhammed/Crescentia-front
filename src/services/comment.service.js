import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const commentService = {
  getComments: async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  },

  createComment: async (postId, data) => {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      data
    );
    return response.data;
  },
};

export default commentService;
