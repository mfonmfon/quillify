import { useState, useEffect, useRef } from 'react';
import { BiSearch, BiUser, BiMenu, BiX } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { FiBook, FiHome, FiInfo, FiNewspaper } from 'react-icons/fi';

const DinaTalksHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Sample suggestions data (replace with your actual API call)
  const sampleSuggestions = [
    { id: 1, title: 'Getting Started with React', type: 'blog' },
    { id: 2, title: 'Advanced JavaScript Concepts', type: 'blog' },
    { id: 3, title: 'Web Development Best Practices', type: 'blog' },
    { id: 4, title: 'UI/UX Design Principles', type: 'blog' },
    { id: 5, title: 'Mobile App Development Guide', type: 'blog' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      // Filter suggestions based on search query
      const filtered = sampleSuggestions.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    navigate(`/search?q=${suggestion.title}`);
  };

  const navItems = [
    { title: "Home", path: "/", icon: <FiHome className="w-5 h-5" /> },
    { title: "About", path: "/about", icon: <FiInfo className="w-5 h-5" /> },
    { title: "Blog", path: "/blog", icon: <FiBook className="w-5 h-5" /> },
    { title: "News", path: "/news", icon: <FiNewspaper className="w-5 h-5" /> },
  ];

  return (
    <div className='w-full bg-white shadow-sm fixed top-0 left-0 z-50'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className='flex justify-between items-center h-20'>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Dina<span className="text-gray-900">Talks</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {item.icon}
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Search and Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="search"
                  className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search blogs, news..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearch}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                />
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <BiSearch className="text-gray-400" />
                      <span className="text-gray-700">{suggestion.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <BiX className="h-6 w-6" />
              ) : (
                <BiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-4" ref={searchRef}>
                <div className="relative">
                  <input
                    type="search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search blogs, news..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearch}
                    onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  />
                  <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Mobile Search Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <BiSearch className="text-gray-400" />
                        <span className="text-gray-700">{suggestion.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 pb-2 space-y-2">
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinaTalksHeader;
