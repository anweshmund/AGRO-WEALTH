import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiBell } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Button from './Button';

const Header = () => {
  const { currentUser, logout, notifications } = useApp();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="AgroWealth Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-green-600">AgroWealth</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">About</Link>
            <Link to="/projects" className="text-gray-700 hover:text-green-600 transition-colors">Projects</Link>
            <Link to="/news" className="text-gray-700 hover:text-green-600 transition-colors">News</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <FiBell className="w-6 h-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-h-96 overflow-y-auto">
                      <h3 className="font-semibold mb-3">Notifications</h3>
                      {notifications.filter(n => n.userId === currentUser.id).length === 0 ? (
                        <p className="text-gray-500 text-sm">No notifications</p>
                      ) : (
                        <div className="space-y-2">
                          {notifications
                            .filter(n => n.userId === currentUser.id)
                            .slice(0, 5)
                            .map(notif => (
                              <div key={notif.id} className="p-2 bg-gray-50 rounded hover:bg-gray-100">
                                <p className="text-sm">{notif.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Link
                  to={currentUser.role === 'farmer' ? '/farmer/dashboard' : 
                      currentUser.role === 'investor' ? '/investor/dashboard' : 
                      '/admin/dashboard'}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="hidden md:inline">{currentUser.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/role-selection">
                  <Button variant="secondary" size="sm">Get Started</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600">About</Link>
              <Link to="/projects" className="text-gray-700 hover:text-green-600">Projects</Link>
              <Link to="/news" className="text-gray-700 hover:text-green-600">News</Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;

