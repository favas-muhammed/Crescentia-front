import React, { useState, useEffect } from "react";
import commentService from "../../services/comment.service";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await commentService.getComments(postId);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [postId]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  );
};

export default CommentList;
