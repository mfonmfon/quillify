import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearch, BiBell, BiUser } from 'react-icons/bi';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Sample search suggestions data - In a real app, this would come from an API
  const sampleSuggestions = [
    { id: 1, title: 'Artificial Intelligence', type: 'topic', path: '/topics/ai' },
    { id: 2, title: 'Machine Learning Basics', type: 'article', path: '/articles/ml-basics' },
    { id: 3, title: 'Deep Learning', type: 'topic', path: '/topics/deep-learning' },
    { id: 4, title: 'AI in Healthcare', type: 'article', path: '/articles/ai-healthcare' },
    { id: 5, title: 'Natural Language Processing', type: 'topic', path: '/topics/nlp' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setIsSearching(true);
      try {
        // In a real app, you would make an API call here
        // const response = await searchApi(searchQuery);
        
        // For now, we'll simulate a search with our sample data
        const results = sampleSuggestions.filter(suggestion =>
          suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (results.length > 0) {
          // Navigate to the first result or a search results page
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
            state: { results }
          });
        } else {
          // Navigate to a "no results" page or show a message
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`, {
            state: { noResults: true }
          });
        }
      } catch (error) {
        console.error('Search failed:', error);
        // Handle error appropriately
      } finally {
        setIsSearching(false);
        setShowSuggestions(false);
      }
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Simulate API call with debounce
    const timer = setTimeout(() => {
      const filtered = sampleSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    navigate(suggestion.path);
  };

  const dashBoardHeaderData = [
    {
      title: 'Create',
      path: '/create',
    },
    {
      title: 'Trend',
      path: '/trends',
    },
    {
      title: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <div className="w-full bg-white fixed top-0 left-0 z-50 border-b border-gray-200">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h2 className="text-blue-600 text-xl font-bold">
              Dina<span className="text-gray-800">Talks</span>
            </h2>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search articles, topics..."
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => searchQuery && setShowSuggestions(true)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
            >
              <BiSearch className="text-xl" />
            </button>
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                {searchSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="text-gray-800">{suggestion.title}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {suggestion.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {isSearching && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Searching...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <BiBell className="text-xl" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2">
                {/* Notification items */}
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <p className="text-sm">New article published</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <BiUser className="text-blue-600" />
              </div>
              <span className="hidden md:block text-sm font-medium">Mfon</span>
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    // Implement logout functionality
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => searchQuery && setShowSuggestions(true)}
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
              >
                <BiSearch className="text-xl" />
              </button>
              
              {/* Mobile Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="text-gray-800">{suggestion.title}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {suggestion.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {isSearching && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">Searching...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-2">
            {dashBoardHeaderData.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
