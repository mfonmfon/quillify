import React, { useState, useEffect } from 'react';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark } from 'react-icons/fi';
import DashboardCardImage from '../../assets/images/Fixa.jpg';

const PublicPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load posts from localStorage
    const loadPosts = () => {
      const storedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
      setPosts(storedPosts);
      setLoading(false);
    };

    loadPosts();
    // Add event listener for storage changes
    window.addEventListener('storage', loadPosts);
    return () => window.removeEventListener('storage', loadPosts);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: "Current User",
            content: comment,
            createdAt: new Date().toISOString()
          }]
        };
      }
      return post;
    }));
  };

  const handleShare = (postId) => {
    // Implement share functionality
    console.log('Sharing post:', postId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Public Posts</h1>
          <p className="text-gray-600 mt-2">Discover what others are sharing</p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-gray-600">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Post Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{post.title}</h2>
                  <p className="text-gray-600 mb-6">{post.description}</p>
                  
                  {post.thumbnail && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition duration-200"
                      >
                        <FiHeart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition duration-200">
                        <FiMessageSquare className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition duration-200"
                      >
                        <FiShare2 className="w-5 h-5" />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-blue-500 transition duration-200">
                      <FiBookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  {post.comments.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold text-gray-900">Comments</h4>
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <img
                            src={DashboardCardImage}
                            alt={comment.author}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{comment.author}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPosts; 