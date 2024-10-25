import React, { useState } from "react";

const CommentSection = ({ postId, comments, handleAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    handleAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      {comments.map((comment, index) => (
        <div key={comment._id || index} className="comment">
          <p>{comment.content}</p>
          <small>{comment.author?.email || "Unknown"}</small>
        </div>
      ))}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
