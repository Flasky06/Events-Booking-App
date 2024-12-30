import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data
  const [showLogout, setShowLogout] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    const userData = sessionStorage.getItem("user");

    if (authToken && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleProfileClick = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowLogout(false);
    alert("Logged out successfully.");
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
        {isLoggedIn && (
          <Link to="/profile" className="cursor-pointer hover:text-gray-400">
            Profile
          </Link>
        )}
      </nav>

      {/* Profile or Login */}
      <div className="relative">
        {isLoggedIn ? (
          <>
            {/* Profile Image */}
            <div
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full bg-gray-600 cursor-pointer flex items-center justify-center text-sm"
              title={user ? user.username : "Profile"}
            >
              {user?.username.charAt(0).toUpperCase() || "P"}
            </div>

            {/* Logout Option */}
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white text-black py-2 px-4 rounded-lg shadow-lg">
                <button
                  onClick={handleLogout}
                  className="text-sm hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="py-2 px-4 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
