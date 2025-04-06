'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New engineer profile available', read: false },
    { id: 2, message: 'Profile view milestone reached', read: false },
  ]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left section */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-red-600 text-2xl font-bold tracking-wider">EngineerFlix</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-gray-300 transition font-medium">
                Home
              </Link>
              <div className="relative group">
                <button
                  className="text-white hover:text-gray-300 transition flex items-center font-medium"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  Categories
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Categories Dropdown */}
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 rounded-md shadow-lg py-2 backdrop-blur-sm">
                    <Link href="/category/software" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Software Engineers
                    </Link>
                    <Link href="/category/mechanical" className="block px-4 py-2 text-white hover:bg-gray-800">
                      Mechanical Engineers
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-gray-300 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64">
                  <input
                    type="text"
                    placeholder="Search engineers..."
                    className="w-full px-4 py-2 bg-black/90 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
                )}
              </button>
              {/* Notifications Dropdown */}
              <div className="absolute right-0 mt-2 w-80 bg-black/90 rounded-md shadow-lg py-2 hidden group-hover:block">
                {notifications.map(notification => (
                  <div key={notification.id} className="px-4 py-2 text-white hover:bg-gray-800">
                    {notification.message}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Menu */}
            <div className="relative group">
              <button
                className="flex items-center space-x-2 text-white hover:text-gray-300 transition"
                onMouseEnter={() => setIsProfileMenuOpen(true)}
                onMouseLeave={() => setIsProfileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                <span className="hidden md:block">Profile</span>
              </button>
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 rounded-md shadow-lg py-2">
                  <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Your Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-white hover:bg-gray-800">
                    Settings
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800">
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-gray-300 transition"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">
                Home
              </Link>
              <Link href="/category/software" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">
                Software Engineers
              </Link>
              <Link href="/category/mechanical" className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md">
                Mechanical Engineers
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar; 