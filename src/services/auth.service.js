import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Login failed");
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Error setting up request");
      }
    }
  },

  signup: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, credentials);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Signup failed");
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Error setting up request");
      }
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },
};

export default authService;
