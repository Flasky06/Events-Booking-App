import React, { useState } from "react";
import MyPostsComponent from "../component/MyPostsComponent";
import UserSettingsComponent from "../component/UserSettingsComponent";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div>
      <div className="container mx-auto py-8">
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
          {activeTab === "settings" && <UserSettingsComponent />}

          {activeTab === "posts" && <MyPostsComponent />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
