import React, { useState } from 'react';

const PublishBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-4xl">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6 text-center">
          Share Your Thoughts
        </h1>
        <form className="space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="title"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your thoughts here..."
              rows="4"
              sm:rows="6"
              required
            ></textarea>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Categories
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              name="categories"
              placeholder="Enter categories (e.g., Tech, Lifestyle)"
              required
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Thumbnail
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="file"
              name="thumbnail"
              onChange={handleImageUpload}
              required
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="my-4 sm:my-6">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishBlog;
