import React, { useEffect } from 'react'
import usePublsihBlogPostStore from '../../zustands/stores/usePublishBlogPostStore';

const BlogPostList = () => {
  const { posts, loading, currentPage, totalPages, fetchPosts, setPage } =
    usePublsihBlogPostStore();

  useEffect(() => {
    fetchPosts(currentPage); // Fetch posts when page changes
  }, [currentPage, fetchPosts]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Paginated Posts</h2>

      {loading && <p className="text-blue-500">Loading posts...</p>}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Buttons */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Prev
        </button>

        <span className="px-4 py-2 border rounded">{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default BlogPostList
