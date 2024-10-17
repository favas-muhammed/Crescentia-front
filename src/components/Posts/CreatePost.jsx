// CreatePost.jsx
import React, { useState } from "react";
import { fetchWithToken } from "../contexts/SessionContext";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState("text");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await fetchWithToken("/api/posts", "POST", {
        content,
        mediaType,
        mediaUrl,
      });
      console.log("New post created:", newPost);
      // Reset form or update post list
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      {mediaType !== "text" && (
        <input
          type="url"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Media URL"
        />
      )}
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
