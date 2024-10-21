import React, { useState } from "react";
import commentService from "../../services/comment.service";
const CreateComment = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await commentService.createComment(postId, { content });
    setContent("");
    // You might want to update the comment list after creation
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Comment</button>
    </form>
  );
};

export default CreateComment;
