import React, { useState, useContext } from "react";
import SessionContext from "../../contexts/SessionContext";

const CommentSection = ({
  postId,
  comments,
  handleAddComment,
  handleUpdateComment,
  token,
}) => {
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const { user } = useContext(SessionContext);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    handleAddComment(newComment);
    setNewComment("");
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditedContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const submitEdit = async (commentId) => {
    await handleUpdateComment(commentId, editedContent);
    setEditingCommentId(null);
    setEditedContent("");
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove the comment from the state or refetch comments
        //we'll assume you have a function to update the comments state
        const updatedComments = comments.filter(
          (comment) => comment._id !== commentId
        );
        updateComments(updatedComments);
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          {editingCommentId === comment._id ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button onClick={() => submitEdit(comment._id)}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{comment.content}</p>
              <small>{comment.author?.email || "Unknown"}</small>
              {user && comment.author._id === user._id && (
                <div>
                  <button onClick={() => startEditing(comment)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
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
