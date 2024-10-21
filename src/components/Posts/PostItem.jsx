import React, { useState, useContext } from "react";
import postService from "../../services/post.service";
import CommentList from "../Comments/CommentList";
import CreateComment from "../Comments/CreateComment";
import ReactionButton from "../Reactions/ReactionButton";
import { SessionContext } from "../../contexts/SessionContext";

const PostItem = ({ post, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const { fetchWithToken } = useContext(SessionContext);

  const handleUpdate = async () => {
    try {
      const updatedPost = await postService.updatePost(post.id, {
        caption: editedCaption,
      });
      setIsEditing(false);
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await postService.deletePost(post.id);
      onPostUpdated(null, post.id); // Notify parent component about deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="post-item">
      {post.mediaUrl && (
        <div className="post-media">
          {post.mediaType === "image" ? (
            <img src={post.mediaUrl} alt="Post" />
          ) : (
            <video src={post.mediaUrl} controls />
          )}
        </div>
      )}
      <div className="post-content">
        {isEditing ? (
          <div>
            <textarea
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>{post.caption}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="post-reactions">
        <ReactionButton
          postId={post.id}
          reactionType="like"
          count={post.likeCount}
          userReacted={post.userLiked}
        />
        {/* Add more reaction types as needed */}
      </div>
      <div className="post-comments">
        <CommentList postId={post.id} />
        <CreateComment postId={post.id} />
      </div>
    </div>
  );
};

export default PostItem;
