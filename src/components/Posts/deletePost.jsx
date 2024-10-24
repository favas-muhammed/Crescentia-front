// api/deletePost.js
import axios from "axios";

const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      `https://your-backend-url.com/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deletePost;
