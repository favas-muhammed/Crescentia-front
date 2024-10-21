import React, { useState } from "react";
import postService from "../../services/post.service";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (media) {
      formData.append("media", media);
    }
    await postService.createPost(formData);
    setCaption("");
    setMedia(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write your caption..."
      />
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files[0])}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
