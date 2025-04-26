"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiLogIn, FiUser } from "react-icons/fi";

const Navbar = () => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load the dark mode preference from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(savedDarkMode);
    }
  }, []);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(newMode));
    }
  };

  // Apply dark mode class to the body element
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const closeMenu = () => setIsMenuOpen(false);
  const logout = () => setIsAuthenticated(false);

  return (
    <nav className={`p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'}`}>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:opacity-80 transition-opacity">
            About
          </Link>
        </li>
        <li>
          <Link href="/form" className="hover:opacity-80 transition-opacity">
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-700 hover:bg-gray-800'} text-white transition-colors`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {!isAuthenticated ? (
          <div className="flex space-x-2">
            <Link href="/login" onClick={closeMenu}>
              <button className="flex items-center px-4 py-2 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors">
                <FiLogIn className="mr-2" size={16} />
                Login
              </button>
            </Link>
            <Link href="/signup" onClick={closeMenu}>
              <button className="flex items-center px-4 py-2 rounded-md bg-amber-600 dark:bg-amber-500 text-white font-medium hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors">
                <FiUser className="mr-2" size={16} />
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <button 
            onClick={() => {
              logout();
              closeMenu();
            }} 
            className="flex items-center px-4 py-2 rounded-md bg-transparent text-amber-600 dark:text-amber-400 border border-amber-600 dark:border-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FiLogIn className="mr-2" size={16} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;