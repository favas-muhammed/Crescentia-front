import React, { useState } from "react";

const CommentSection = ({ postId, comments, handleAddComment }) => {
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    handleAddComment(newComment);
    setNewComment("");
  };

  return (
    <div>
      {showComments ? (
        <div>
          <h4>Comments</h4>
          {comments.map((comment, index) => (
            <p key={index}>{comment.content}</p> // Adjust this according to your comment structure
          ))}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button type="submit">Post</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setShowComments(true)}>Show Comments</button>
      )}
    </div>
  );
};

export default CommentSection;
