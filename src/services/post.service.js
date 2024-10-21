// src/services/post.service.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const postService = {
  createPost: async (formData) => {
    const response = await axios.post(`${API_URL}/posts`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getPosts: async () => {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  updatePost: async (id, data) => {
    const response = await axios.put(`${API_URL}/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id) => {
    await axios.delete(`${API_URL}/posts/${id}`);
  },
};

export default postService;
