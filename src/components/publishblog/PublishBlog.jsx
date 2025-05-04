import React, { useState } from 'react';
import { FiUpload, FiImage, FiTag, FiX } from 'react-icons/fi';
import DashboardCardImage from '../../assets/images/Fixa.jpg';
import { useNavigate } from 'react-router-dom';

const PublishBlog = () => {
  const navigate = useNavigate();
  const [blogPostFormData, setBlogPostFormData] = useState({
    title: '',
    description: '',
    categories: '',
    thumbnail: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogPostFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);

      setBlogPostFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setBlogPostFormData((prevData) => ({
        ...prevData,
        thumbnail: file,
      }));
    }
  };

  const handleCategoryAdd = (e) => {
    if (e.key === 'Enter' && blogPostFormData.categories.trim()) {
      const newCategory = blogPostFormData.categories.trim();
      if (!selectedCategories.includes(newCategory)) {
        setSelectedCategories([...selectedCategories, newCategory]);
        setBlogPostFormData((prevData) => ({
          ...prevData,
          categories: '',
        }));
      }
    }
  };

  const handleCategoryRemove = (category) => {
    setSelectedCategories(selectedCategories.filter(c => c !== category));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new post object
    const newPost = {
      id: Date.now(),
      title: blogPostFormData.title,
      description: blogPostFormData.description,
      categories: selectedCategories,
      thumbnail: imagePreview,
      author: {
        name: "Current User", // This would come from your auth system
        avatar: DashboardCardImage
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0
    };

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    
    // Add new post to the beginning of the array
    const updatedPosts = [newPost, ...existingPosts];
    
    // Save back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

    // Reset form
    setBlogPostFormData({
      title: '',
      description: '',
      categories: '',
      thumbnail: null,
    });
    setImagePreview(null);
    setSelectedCategories([]);

    // Navigate to the public posts page
    navigate('/public-posts');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex h-screen">
        {/* Left Side - Image Section */}
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={DashboardCardImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-white bg-black/30">
            <h1 className="text-4xl font-bold mb-4 text-center">Create Your Blog Post</h1>
            <p className="text-xl text-white text-center max-w-md">
              Share your thoughts, ideas, and stories with the world. Your voice matters.
            </p>
            <div className="mt-8 flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FiImage className="w-5 h-5" />
                </div>
                <span>Add engaging images</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FiTag className="w-5 h-5" />
                </div>
                <span>Organize with categories</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FiUpload className="w-5 h-5" />
                </div>
                <span>Easy content publishing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full lg:w-1/2 overflow-y-auto">
          <div className="min-h-screen flex flex-col justify-center p-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Blog Post</h2>
                <p className="text-gray-600 mb-6">Fill in the details below to publish your post</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={blogPostFormData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Give your post a compelling title..."
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={blogPostFormData.description}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                      placeholder="Write your story here..."
                      required
                    />
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Categories</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedCategories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => handleCategoryRemove(category)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FiX size={16} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="categories"
                        value={blogPostFormData.categories}
                        onChange={handleInputChange}
                        onKeyPress={handleCategoryAdd}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        placeholder="Add categories (press Enter to add)"
                      />
                      <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition duration-200 ${
                        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="thumbnail-upload"
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <FiImage className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Drag and drop an image, or{' '}
                          <span className="text-blue-600 hover:text-blue-800">browse</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 1200x630px (max 2MB)
                        </p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4 relative group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setBlogPostFormData((prev) => ({ ...prev, thumbnail: null }));
                          }}
                          className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition duration-200"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      Publish Blog Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishBlog;
