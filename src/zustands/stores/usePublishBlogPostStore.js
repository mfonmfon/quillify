import { create } from "zustand";

const usePublsihBlogPostStore = create((set) => ({
  blogPost: [],
  isLoading: false,
  currentPage: 1,
  postsPerPage: 15,
  totalPages: 0,

  fetchPosts: async (page = 1, limit = 15) => {
    set({ isLoading: true });

    try {
      const blogPostDataResponse = await fetch(
        `https://api.twitter.com/posts?_page=${page}&_limit=${limit}`, // Corrected query parameter for limit
        {
          headers: {
            'Accept': 'application/json',
            // Add authentication headers if required
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );

      if (!blogPostDataResponse.ok) {
        throw new Error(`HTTP error! status: ${blogPostDataResponse.status}`);
      }

      const totalPosts = blogPostDataResponse.headers.get("X-Total-Count"); // Use standard header for total count
      const data = await blogPostDataResponse.json();

      set({
        blogPost: data,
        isLoading: false,
        currentPage: page,
        totalPages: totalPosts ? Math.ceil(totalPosts / limit) : 1, // Default to 1 if totalPosts is null
      });
    } catch (error) {
      set({ isLoading: false });
      console.error("Error fetching posts:", error); // Improved error logging
    }
  },

  setPages: (page) => set({ currentPage: page }),
}));

export default usePublsihBlogPostStore;