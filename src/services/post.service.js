import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const postService = {
  create: (formData) => {
    return axios.post(`${API_URL}/posts`, formData);
  },
  getAllPosts: () => {
    return axios.get(`${API_URL}/posts`);
  },
  updatePost: (id, data) => {
    return axios.put(`${API_URL}/posts/${id}`, data);
  },
  deletePost: (id) => {
    return axios.delete(`${API_URL}/posts/${id}`);
  },
};

export default postService;
