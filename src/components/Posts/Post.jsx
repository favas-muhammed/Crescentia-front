import React, { useState, useEffect, useContext } from "react";
import ReactionButton from "../Reactions/ReactionButton";
import SessionContext from "../../contexts/SessionContext";

const Post = ({ post, canEdit, onDelete }) => {
  const { token } = useContext(SessionContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  useEffect(() => {
    console.log("Post data:", post);
  }, [post]);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${post._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );

      if (response.ok) {
        setIsEditing(false);
        // fetch thw data(reload)
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId)); // remove this and fetch all the post
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img
          src="src/user.jpg"
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
          <p className="post-text">{post.content || "No content available"}</p>
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
            <button onClick={() => setIsEditing(true)}>✎</button>
            <button onClick={() => handleDelete(post._id)}>🗑️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
