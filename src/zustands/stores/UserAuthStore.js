import axios from "axios";
import { create } from "zustand";

// This is a basic example of a user authentication store using Zustand
// It includes registration and login functionality with error handling
// and loading states.
// You can expand this store with more features like logout, password reset, etc.
// and integrate it with your application's state management.
// Make sure to adjust the API endpoints and response handling according to your backend.
// import { useNavigate } from 'react-router-dom';
const userAuthStore = create((set) => ({
  user: null,
  token: null,
  error: null,
  isLoading: false,

  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post('http://localhost:8080/publisher/register', userData);
      // Ensure the response structure matches your API
      const user = response.data?.user || response.data; // Adjust based on API response
      set({ user, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false,
      });
    }
  },
  login: async (credentials) => {
    set({ isLoading: true, error: null });

    try {
      const loginResponse = await axios.post("https://your-api.com/login", credentials);
      // Assuming the login response contains a token and user details
      const { token, user } = loginResponse.data;
      set({ user, token, isLoading: false }); // Store token and user details
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
    }
  },
}));

export default userAuthStore;