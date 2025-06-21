import React, { useState } from 'react';
import { Bell, User, Search } from 'lucide-react';
import { useHealth } from '../contexts/HealthContext';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, setIsAuthenticated, unreadCount } = useHealth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo + Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate?.('dashboard')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path d="M12 2l1.5 4.5H18l-3.75 2.75L15.75 14 12 11.25 8.25 14l1.5-4.75L6 6.5h4.5L12 2z" />
              </svg>
            </div>
            <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Medisense AI
            </h1>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none focus:border-transparent"
              />
            </div>

            {/* Notification Button */}
            <div className="relative">
              <button
                aria-label="Open notifications"
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <NotificationDropdown
                  onClose={() => setShowNotifications(false)}
                  onNavigate={onNavigate}
                />
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'John Doe'}
                  </p>
                  <p className="text-xs text-gray-500">Premium Plan</p>
                </div>
                <button
                  aria-label="Open user menu"
                  className="bg-gray-300 rounded-full p-2 hover:bg-gray-400 transition-colors"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              {showUserMenu && (
                <UserDropdown
                  onClose={() => setShowUserMenu(false)}
                  onNavigate={onNavigate}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
