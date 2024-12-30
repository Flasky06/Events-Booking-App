import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileNavComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="px-6 py-4 flex items-center justify-between z-50 text-black bg-white top-0 fixed w-full shadow-md md:hidden">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-900">
        <span className="text-blue-600">Logo</span>
      </Link>

      {/* Hamburger Menu */}
      <button
        onClick={toggleMenu}
        className="focus:outline-none focus:ring-2 focus:ring-gray-800"
        aria-label={menuOpen ? "Close Menu" : "Open Menu"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-0 right-0 bg-white text-black shadow-xl w-full h-screen z-40 transition-transform transform translate-x-0 md:hidden">
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 text-gray-600 hover:text-black focus:outline-none"
              aria-label="Close Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center py-10 space-y-6">
              <Link
                to="/"
                className="text-lg text-gray-900 hover:text-blue-600 transition duration-300 transform hover:scale-105"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/create-event"
                className="text-lg text-gray-900 hover:text-blue-600 transition duration-300 transform hover:scale-105"
                onClick={closeMenu}
              >
                Create Event
              </Link>
              <Link
                to="/profile"
                className="text-lg text-gray-900 hover:text-blue-600 transition duration-300 transform hover:scale-105"
                onClick={closeMenu}
              >
                Profile
              </Link>

              {/* Logout Link */}
              <Link
                to="/logout"
                className="text-lg text-red-600 hover:text-red-800 transition duration-300 transform hover:scale-105 mt-auto"
                onClick={closeMenu}
              >
                Logout
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default MobileNavComponent;
