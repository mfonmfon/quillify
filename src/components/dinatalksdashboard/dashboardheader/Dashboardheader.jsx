import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
    <div className="w-full bg-white fixed top-0 left-0 z-50 shadow-md">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div>
          <h2 className="text-blue-600 text-lg font-bold">
            News<span className="text-black">hub</span>
          </h2>
        </div>

        {/* Mobile Menu Icon */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none"
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

        {/* Navigation Links */}
        <ul
          className={`${
            mobileMenuOpen
              ? 'flex flex-col items-center space-y-4 absolute bg-white w-full left-0 top-16 p-4 shadow-md'
              : 'hidden lg:flex lg:flex-row gap-6'
          }`}
        >
          {dashBoardHeaderData.map((newshead, index) => (
            <li className="list-none text-sm" key={index}>
              <Link className="hover:text-blue-500" to={newshead.path}>
                {newshead.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DashboardHeader;
