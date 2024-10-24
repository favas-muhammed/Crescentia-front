import React, { useState, useEffect, useContext } from "react";
import ReactionButton from "../Reactions/ReactionButton";
import SessionContext from "../../contexts/SessionContext";
import CommentButton from "../Comments/CommentButton";
import CommentSection from "../Comments/CommentSection";

const Post = ({ post, canEdit, onDelete, onUpdate }) => {
  const { token } = useContext(SessionContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [comments, setComments] = useState([]);
  const [showCommentSection, setShowCommentSection] = useState(false);

  useEffect(() => {
    console.log("Post data:", post);
    // Fetch comments for the post when it mounts
    const fetchComments = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comments`
      );
      const data = await response.json();
      setComments(data);
    };
    fetchComments();
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
        onUpdate();
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
        onDelete(post._id);
        onUpdate();
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddComment = async (newComment) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/${post._id}/comments`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (response.ok) {
        const addedComment = await response.json();
        setComments((prevComments) => [...prevComments, addedComment]);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
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

        <CommentButton
          postId={post._id}
          handleCommentClick={() => setShowCommentSection(true)}
        />

        {canEdit && (
          <div className="post-edit-actions">
            <button onClick={() => setIsEditing(true)}>✎</button>
            <button onClick={() => handleDelete(post._id)}>🗑️</button>
          </div>
        )}
      </div>

      {showCommentSection && (
        <CommentSection
          postId={post._id}
          comments={comments}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Post;
