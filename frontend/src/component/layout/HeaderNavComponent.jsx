import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const HeaderNavComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
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
    <header className="flex items-center justify-between px-6 py-4 text-slate-950 bg-white top-0 fixed w-full z-10 shadow-md h-20">
      {/* Logo */}
      <NavLink to="/" className="text-lg font-bold">
        Logo
      </NavLink>

      {/* Navigation */}
      <nav className="flex space-x-14">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "cursor-pointer text-blue-600 font-semibold"
              : "cursor-pointer text-slate-950 hover:text-blue-600"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/create-event"
          className={({ isActive }) =>
            isActive
              ? "cursor-pointer text-blue-600 font-semibold"
              : "cursor-pointer text-slate-950 hover:text-blue-600"
          }
        >
          Create Event
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "cursor-pointer text-blue-600 font-semibold"
                : "cursor-pointer text-slate-950 hover:text-blue-600"
            }
          >
            Profile
          </NavLink>
        )}
      </nav>

      {/* Profile or Login */}
      <div className="relative">
        {isLoggedIn ? (
          <>
            {/* Profile Image */}
            <div
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full bg-black text-white cursor-pointer flex items-center justify-center text-sm"
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
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "py-2 px-4 rounded-lg cursor-pointer text-blue-600 font-semibold"
                : "py-2 px-4 rounded-lg cursor-pointer text-slate-950 hover:text-blue-600"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default HeaderNavComponent;
