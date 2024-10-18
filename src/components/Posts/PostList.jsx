import React, { useState, useEffect, useContext } from "react";
import PostItem from "./PostItem";
import { SessionContext } from "../../contexts/SessionContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { fetchWithToken } = useContext(SessionContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await fetchWithToken("/api/posts");
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [fetchWithToken]);

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
