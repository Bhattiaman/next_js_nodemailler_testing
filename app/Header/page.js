"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the dark mode preference from localStorage if available
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
  }, []);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  // Apply dark mode class to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className={`p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'}`}>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className={`text-white ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/About" className={`text-white ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
            About
          </Link>
        </li>
        <li>
          <Link href="/Form" className={`text-white ${isDarkMode ? 'text-gray-200' : 'text-white'}`}>
            Contact
          </Link>
        </li>
      </ul>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`text-white bg-gray-700 p-2 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-700'}`}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
