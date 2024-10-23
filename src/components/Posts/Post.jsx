import React, { useState } from "react";
import ReactionButton from "../Reactions/ReactionButton";

const Post = ({ post, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add your authorization header here if required
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        // You might want to refresh the posts here
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
          {
            method: "DELETE",
            // Add your authorization header here if required
          }
        );

        if (response.ok) {
          // You might want to refresh the posts here
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.author.avatar || "/default-avatar.png"}
          alt={post.author.email}
          className="post-avatar"
        />
        <div className="post-meta">
          <div className="post-author">{post.author.email}</div>
          <div className="post-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="post-content">
        {isEditing ? (
          <div className="edit-post">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="edit-actions">
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <p>{post.content}</p>
        )}

        {post.media && (
          <div className="post-media">
            {post.media.type.startsWith("image/") ? (
              <img src={post.media.url} alt="Post media" />
            ) : (
              <video src={post.media.url} controls />
            )}
          </div>
        )}
      </div>

      <div className="post-actions">
        <ReactionButton
          postId={post._id}
          type="heart"
          count={post.reactions?.heart || 0}
          userReacted={post.userReactions?.includes("heart")}
        />
        <ReactionButton
          postId={post._id}
          type="clap"
          count={post.reactions?.clap || 0}
          userReacted={post.userReactions?.includes("clap")}
        />

        {canEdit && (
          <div className="post-edit-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
