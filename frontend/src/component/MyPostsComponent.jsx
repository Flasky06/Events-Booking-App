import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"; // Ensure this path is correct based on your file structure

const MyPostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with how you store your auth token
        const response = await fetch("http://127.0.0.1:8000/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.data); // Adjust if your response structure differs
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts.");
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div assName="container mx-auto py-4">
      <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
      {posts.length === 0 ? (
        <div>You have not created any posts yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <EventCard key={post.id} event={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsComponent;
