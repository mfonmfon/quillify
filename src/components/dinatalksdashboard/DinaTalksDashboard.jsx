import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import DashboardCardImage from '../../assets/images/Fixa.jpg';
import DashboardHeader from './dashboardheader/Dashboardheader';

const DinaTalksDashboard = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      author: 'Sarah Johnson',
      authorImage: DashboardCardImage,
      title: 'The Future of AI in Healthcare', 
      content: 'Exploring how artificial intelligence is revolutionizing healthcare delivery and patient care. From diagnosis to treatment planning, AI is making healthcare more efficient and personalized.',
      likes: 245,
      comments: [
        { id: 1, author: 'Mike Chen', content: 'Great insights! AI in healthcare is truly transformative.', time: '2 hours ago' },
        { id: 2, author: 'Emma Wilson', content: 'I agree! The potential for personalized medicine is exciting.', time: '1 hour ago' }
      ],
      shares: 12,
      time: '2 hours ago',
      image: DashboardCardImage,
      category: 'Technology',
      isLiked: false,
      isBookmarked: false
    },
    { 
      id: 2, 
      author: 'Michael Chen',
      authorImage: DashboardCardImage,
      title: 'Machine Learning Basics', 
      content: 'A beginner-friendly introduction to machine learning concepts and applications. Understanding the fundamentals of supervised and unsupervised learning.',
      likes: 189,
      comments: [
        { id: 3, author: 'David Lee', content: 'Very helpful for beginners! Thanks for sharing.', time: '3 hours ago' }
      ],
      shares: 8,
      time: '5 hours ago',
      image: DashboardCardImage,
      category: 'Education',
      isLiked: true,
      isBookmarked: true
    },
    { 
      id: 3, 
      author: 'Emma Wilson',
      authorImage: DashboardCardImage,
      title: 'Understanding Neural Networks', 
      content: 'Deep dive into the architecture and functioning of neural networks. Exploring different types of layers and activation functions.',
      likes: 312,
      comments: [
        { id: 4, author: 'Sarah Johnson', content: 'Excellent explanation! The diagrams really help.', time: '4 hours ago' },
        { id: 5, author: 'Alex Brown', content: 'Would love to see more examples of different architectures.', time: '3 hours ago' }
      ],
      shares: 15,
      time: '1 day ago',
      image: DashboardCardImage,
      category: 'Science',
      isLiked: false,
      isBookmarked: false
    },
    { 
      id: 4, 
      author: 'David Lee',
      authorImage: DashboardCardImage,
      title: 'Data Visualization Techniques', 
      content: 'Best practices for creating effective data visualizations. Tips for choosing the right chart types and making your data tell a story.',
      likes: 156,
      comments: [
        { id: 6, author: 'Michael Chen', content: 'Great tips! The color theory section was particularly useful.', time: '6 hours ago' }
      ],
      shares: 7,
      time: '2 days ago',
      image: DashboardCardImage,
      category: 'Data Science',
      isLiked: false,
      isBookmarked: true
    },
    { 
      id: 5, 
      author: 'Alex Brown',
      authorImage: DashboardCardImage,
      title: 'Web Development Trends 2024', 
      content: 'Exploring the latest trends in web development, from new frameworks to emerging technologies. What to watch out for in the coming year.',
      likes: 278,
      comments: [
        { id: 7, author: 'Emma Wilson', content: 'Interesting predictions! The focus on performance is crucial.', time: '1 day ago' },
        { id: 8, author: 'David Lee', content: 'Would love to see more about WebAssembly applications.', time: '1 day ago' }
      ],
      shares: 23,
      time: '3 days ago',
      image: DashboardCardImage,
      category: 'Web Development',
      isLiked: true,
      isBookmarked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [activeCommentPost, setActiveCommentPost] = useState(null);

  // Featured content for the slider
  const featuredContent = [
    {
      id: 1,
      title: 'Featured Story',
      description: 'Discover the latest trends in technology and innovation',
      image: DashboardCardImage,
      category: 'Technology',
      author: 'Featured Writer'
    },
    {
      id: 2,
      title: 'Popular Topic',
      description: 'Explore the future of artificial intelligence',
      image: DashboardCardImage,
      category: 'AI',
      author: 'Tech Expert'
    },
    {
      id: 3,
      title: 'Trending Now',
      description: 'Learn about the newest developments in machine learning',
      image: DashboardCardImage,
      category: 'ML',
      author: 'Industry Leader'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleShare = (postId) => {
    // Implement share functionality
    console.log('Shared post:', postId);
  };

  const handleCommentSubmit = (postId) => {
    if (newComment.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, {
              id: Date.now(),
              author: 'Current User',
              content: newComment,
              time: 'Just now'
            }]
          };
        }
        return post;
      }));
      setNewComment('');
      setActiveCommentPost(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardHeader />
      
      {/* Main Content */}
      <main className="pt-16 sm:pt-20 pb-6 sm:pb-10 px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Featured Content Slider */}
          <div className="relative mb-4 xs:mb-5 sm:mb-6 md:mb-8 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              {featuredContent.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-6 md:p-8 text-white">
                      <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 bg-blue-500/80 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium">
                        {item.category}
                      </span>
                      <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mt-2 xs:mt-3 sm:mt-4">{item.title}</h2>
                      <p className="text-xs xs:text-sm sm:text-base md:text-lg mt-1 xs:mt-2 text-gray-200 line-clamp-2">{item.description}</p>
                      <p className="text-[10px] xs:text-xs sm:text-sm mt-2 xs:mt-3 sm:mt-4 text-gray-300">By {item.author}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-1 xs:left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-1 xs:p-1.5 sm:p-2 transition duration-300"
              >
                <FiChevronLeft className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-1 xs:right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-1 xs:p-1.5 sm:p-2 transition duration-300"
              >
                <FiChevronRight className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-1 xs:bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 xs:space-x-1.5 sm:space-x-2">
                {featuredContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 rounded-full transition duration-300 ${
                      index === currentSlide ? 'bg-white w-2.5 xs:w-3 sm:w-4' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Create Post Button */}
          <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
            <button 
              onClick={() => navigate('/create')}
              className="w-full px-3 xs:px-4 sm:px-6 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg sm:rounded-xl md:rounded-2xl font-medium hover:from-blue-700 hover:to-blue-900 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <FiEdit2 className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              <span className="text-xs xs:text-sm sm:text-base">Create New Post</span>
            </button>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 mb-4 xs:mb-5 sm:mb-6 md:mb-8">
            {[
              { title: 'Your Stories', value: '12', icon: FiEdit2, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
              { title: 'Engagement', value: '1.2K', icon: FiHeart, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
              { title: 'Connections', value: '245', icon: FiMessageSquare, color: 'bg-gradient-to-r from-green-500 to-teal-500' },
              { title: 'Following', value: '156', icon: FiTrendingUp, color: 'bg-gradient-to-r from-orange-500 to-red-500' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-2 xs:p-3 sm:p-4 md:p-6 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center">
                  <div className={`p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg md:rounded-xl ${stat.color} text-white shadow-lg`}>
                    <stat.icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="ml-2 xs:ml-3">
                    <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Community Posts */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6 md:space-y-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                {/* Post Header */}
                <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 xs:space-x-3">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                      />
                      <div>
                        <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900">{post.author}</h3>
                        <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <span className="px-2 xs:px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] xs:text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6">
                    <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 xs:mb-3">{post.title}</h2>
                    <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">{post.content}</p>
                  </div>

                  {post.image && (
                    <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-80 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="border-t border-gray-100 px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-3 sm:py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3 xs:space-x-4 sm:space-x-6 md:space-x-8">
                      <button 
                        className={`flex items-center space-x-1 xs:space-x-2 ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500'
                        } hover:text-red-500 transition duration-300`}
                        onClick={() => handleLike(post.id)}
                      >
                        <FiHeart className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs xs:text-sm sm:text-base font-medium">{post.likes}</span>
                      </button>
                      <button 
                        className="flex items-center space-x-1 xs:space-x-2 text-gray-500 hover:text-blue-500 transition duration-300"
                        onClick={() => setActiveCommentPost(post.id)}
                      >
                        <FiMessageSquare className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs xs:text-sm sm:text-base font-medium">{post.comments.length}</span>
                      </button>
                      <button 
                        className="flex items-center space-x-1 xs:space-x-2 text-gray-500 hover:text-green-500 transition duration-300"
                        onClick={() => handleShare(post.id)}
                      >
                        <FiShare2 className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs xs:text-sm sm:text-base font-medium">{post.shares}</span>
                      </button>
                    </div>
                    <button 
                      className={`${
                        post.isBookmarked ? 'text-blue-500' : 'text-gray-500'
                      } hover:text-blue-500 transition duration-300`}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <FiBookmark className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Comments Section */}
                  {activeCommentPost === post.id && (
                    <div className="mt-3 xs:mt-4">
                      <div className="flex items-start space-x-2 xs:space-x-3">
                        <img 
                          src={DashboardCardImage} 
                          alt="Profile" 
                          className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <textarea
                            className="w-full p-2 xs:p-2.5 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 text-xs xs:text-sm sm:text-base"
                            placeholder="Write a comment..."
                            rows="1"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <button
                            className="mt-2 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-[10px] xs:text-xs sm:text-sm font-medium hover:bg-blue-700 transition duration-300"
                            onClick={() => handleCommentSubmit(post.id)}
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                      
                      {/* Display Comments */}
                      {post.comments.length > 0 && (
                        <div className="mt-3 xs:mt-4 space-y-2 xs:space-y-3 sm:space-y-4">
                          {post.comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-2 xs:space-x-3">
                              <img 
                                src={DashboardCardImage} 
                                alt={comment.author} 
                                className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full object-cover"
                              />
                              <div className="flex-1 bg-gray-50 rounded-lg sm:rounded-xl p-2 xs:p-2.5 sm:p-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-900">{comment.author}</span>
                                  <span className="text-[10px] xs:text-xs text-gray-500">{comment.time}</span>
                                </div>
                                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-700 mt-1">{comment.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DinaTalksDashboard;
