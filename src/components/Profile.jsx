import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import PostItem from "../Posts/PostItem";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { fetchWithToken } = useContext(SessionContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await fetchWithToken("/api/users/profile");
        setUser(userData);
        const userPosts = await fetchWithToken("/api/posts/user");
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [fetchWithToken]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <h3>Your Posts:</h3>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Profile;
