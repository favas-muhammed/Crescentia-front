import React, { useState, useEffect } from "react";
import { fetchWithToken } from "../contexts/SessionContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchWithToken("/api/posts");
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Continuing from PostList.jsx
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
