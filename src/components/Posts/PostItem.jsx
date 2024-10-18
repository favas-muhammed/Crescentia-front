import React, { useState, useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";

const PostItem = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { fetchWithToken } = useContext(SessionContext);

  const handleLike = async () => {
    try {
      const updatedPost = await fetchWithToken(
        `/api/posts/${post._id}/like`,
        "POST"
      );
      setLikes(updatedPost.likes.length);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const newCommentData = await fetchWithToken(
        `/api/comments/${post._id}`,
        "POST",
        { content: newComment }
      );
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error commenting on post:", error);
    }
  };

  return (
    <div>
      <h3>{post.author.username}</h3>
      <p>{post.content}</p>
      {post.mediaType !== "none" &&
        (post.mediaType === "image" ? (
          <img src={post.mediaUrl} alt="Post media" />
        ) : (
          <video src={post.mediaUrl} controls />
        ))}
      <p>Likes: {likes}</p>
      <button onClick={handleLike}>Like</button>
      <h4>Comments:</h4>
      {comments.map((comment) => (
        <p key={comment._id}>
          {comment.author.username}: {comment.content}
        </p>
      ))}
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
};

export default PostItem;
