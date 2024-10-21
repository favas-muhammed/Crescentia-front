import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import postService from "../../services/post.service";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await postService.getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
