// PostItem.jsx
import React from "react";

const PostItem = ({ post }) => {
  return (
    <div>
      <h3>{post.author.username}</h3>
      <p>{post.content}</p>
      {post.mediaType &&
        post.mediaUrl &&
        (post.mediaType === "image" ? (
          <img src={post.mediaUrl} alt="Post media" />
        ) : (
          <video src={post.mediaUrl} controls />
        ))}
      <p>Likes: {post.likes.length}</p>
      <p>Comments: {post.comments.length}</p>
    </div>
  );
};

export default PostItem;
