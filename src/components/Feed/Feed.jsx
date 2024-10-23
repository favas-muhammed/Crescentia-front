import React, { useState, useEffect } from "react";
import Post from "../Posts/Post";
import { useSession } from "../../contexts/SessionContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSession();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed">
      <div className="create-post">
        <CreatePost onPostCreated={fetchPosts} />
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            canEdit={post.author._id === user?._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
