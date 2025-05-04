import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiHome, FiCompass, FiEdit2, FiBell, FiMail, 
  FiUser, FiBookmark, FiSettings, FiX, FiMenu 
} from 'react-icons/fi';
import DashboardCardImage from '../../../assets/images/Fixa.jpg';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const unreadNotifications = 3;
  const unreadMessages = 2;

  const sidebarItems = [
    { icon: FiHome, label: 'Home', path: '/dashboard' },
    { icon: FiCompass, label: 'Explore', path: '/explore' },
    { icon: FiEdit2, label: 'Create Post', path: '/create' },
    { icon: FiBell, label: 'Notifications', path: '/notifications', badge: unreadNotifications },
    { icon: FiMail, label: 'Messages', path: '/messages', badge: unreadMessages },
    { icon: FiUser, label: 'Profile', path: '/profile' },
    { icon: FiBookmark, label: 'Saved Posts', path: '/saved' },
    { icon: FiSettings, label: 'Settings', path: '/settings' }
  ];

  return (
    <>
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">DinaTalks</h1>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <div className="relative">
                      <item.icon className="w-5 h-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
              <img 
                src={DashboardCardImage} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Your Name</p>
                <p className="text-xs text-gray-500">@username</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => onClose(true)}
        className="fixed bottom-4 right-4 lg:hidden z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 lg:hidden z-40"
          onClick={() => onClose(false)}
        />
      )}
    </>
  );
};

export default Sidebar; 