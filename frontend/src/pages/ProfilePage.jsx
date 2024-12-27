import React, { useState } from "react";
import HeaderComponent from "../component/layout/HeaderComponent";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <diV>
      <HeaderComponent />
      <div className="container mx-auto py-8">
        {" "}
        <h2 className="text-3xl mb-6 text-center">Profile Page</h2>
        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-4 rounded ${
              activeTab === "settings"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            User Settings
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-2 px-4 rounded ${
              activeTab === "posts"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            My Posts
          </button>
        </div>
        {/* Tab Content */}
        <div className="p-4 border rounded">
          {activeTab === "settings" && (
            <div>
              <h3 className="text-xl font-medium mb-4">User Settings</h3>
              <p>Here you can manage your account settings.</p>
              {/* Add your settings form or details here */}
            </div>
          )}

          {activeTab === "posts" && (
            <div>
              <h3 className="text-xl font-medium mb-4">My Posts</h3>
              <p>Here are all your posts.</p>
              {/* Add logic to fetch and display user's posts */}
            </div>
          )}
        </div>
      </div>
    </diV>
  );
};

export default ProfilePage;
