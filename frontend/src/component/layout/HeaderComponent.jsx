import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const [showLogout, setShowLogout] = useState(false);

  const handleProfileClick = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link to="/" className="text-lg font-bold">
        Logo
      </Link>

      {/* Navigation */}
      <nav className="flex space-x-14">
        <Link to="/" className="cursor-pointer hover:text-gray-400">
          Home
        </Link>
        <Link to="/create-event" className="cursor-pointer hover:text-gray-400">
          Create Event
        </Link>
        <Link to="/profile" className="cursor-pointer hover:text-gray-400">
          Profile
        </Link>
      </nav>

      {/* Profile and Logout */}
      <div className="relative">
        {/* Profile Image */}
        <div
          onClick={handleProfileClick}
          className="w-10 h-10 rounded-full bg-gray-600 cursor-pointer flex items-center justify-center text-sm"
          title="Profile"
        >
          P
        </div>

        {/* Logout Option */}
        {showLogout && (
          <div className="absolute right-0 mt-2 bg-white text-black py-2 px-4 rounded-lg shadow-lg">
            <button
              onClick={() => alert("Logging out...")}
              className="text-sm hover:text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
