import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const DinaTalksFooter = () => {
  const footerLinks = [
    { path: '/', title: 'Home' },
    { path: '/about', title: 'About' },
    { path: '/podcast', title: 'Podcast' },
    { path: '/blog', title: 'Blog' },
    { path: '/resources', title: 'Resources' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-15">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">DinaTalks</h2>
          <p className="text-sm leading-relaxed">
            Discover the latest trends, advancements, and applications of artificial intelligence in the digital age. Unlock your full potential with DinaTalks.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 flex gap-4">
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className="hover:text-blue-500 transition duration-300"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition duration-300"
            >
              <FaFacebookF className="text-white text-lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-400 transition duration-300"
            >
              <FaTwitter className="text-white text-lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-pink-500 transition duration-300"
            >
              <FaInstagram className="text-white text-lg" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-700 transition duration-300"
            >
              <FaLinkedinIn className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} DinaTalks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default DinaTalksFooter;
