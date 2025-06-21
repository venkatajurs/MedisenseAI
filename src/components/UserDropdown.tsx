
import React from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface UserDropdownProps {
  onClose: () => void;
  onNavigate?: (page: string) => void;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose, onNavigate, onLogout }) => {
  const handleNavigation = (page: string) => {
    onNavigate?.(page);
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="py-1">
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleNavigation('profile')}
        >
          <User className="h-4 w-4 mr-3" />
          View Profile
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleNavigation('profile')}
        >
          <Settings className="h-4 w-4 mr-3" />
          Account Settings
        </button>
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => handleNavigation('help')}
        >
          <HelpCircle className="h-4 w-4 mr-3" />
          Help & Support
        </button>
        <hr className="my-1" />
        <button
          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
