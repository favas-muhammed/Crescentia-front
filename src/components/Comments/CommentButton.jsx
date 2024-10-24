import React from "react";

const CommentButton = ({ postId, handleCommentClick }) => {
  return <button onClick={() => handleCommentClick(postId)}>Comment</button>;
};

export default CommentButton;
