import axios from "axios";
import Swal from "sweetalert2";
import { create } from "zustand";

const useUserAuthStore = create((set) => ({
  user: null,
  token: null,
  error: null,
  isLoading: false,

  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        'http://localhost:8080/publisher/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      const user = response.data?.user || response.data;
      set({ user, isLoading: false });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Your account has been created!',
        confirmButtonText: 'OK',
        color: '#3085d6',
      });
    } catch (error) {
      set({ isLoading: false });

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'Something went wrong!',
        confirmButtonText: 'Try again',
        confirmButtonColor: '#3085d6',
      });
    }
  },

  // ...existing code for login and other methods...
}));

export default useUserAuthStore;




