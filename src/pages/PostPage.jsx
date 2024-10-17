// PostPage.jsx
import React from "react";
import PostList from "../components/Posts/PostList";
import CreatePost from "../components/Posts/CreatePost";

const PostPage = () => {
  return (
    <div>
      <h1>Posts</h1>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default PostPage;
