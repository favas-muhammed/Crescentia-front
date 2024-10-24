import React, { useState } from "react";
import { useSession } from "../../contexts/SessionContext";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const { token } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);

    /* const formData = new FormData();
    formData.append("content", content);
    if (media) {
      formData.append("media", media);
    } */

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        setContent("");
        setMedia(null);
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      />

      <input
        type="file"
        onChange={(e) => setMedia(e.target.files[0])}
        accept="image/*,video/*"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
