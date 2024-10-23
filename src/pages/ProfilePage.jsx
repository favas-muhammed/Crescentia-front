import React, { useState, useEffect } from "react";
import { useSession } from "../contexts/SessionContext";
import Post from "../components/Posts/Post";

const ProfilePage = () => {
  const { user } = useSession();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?._id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/user/${user._id}`
        );
        const data = await response.json();
        if (response.ok) {
          setUserPosts(data);
        }
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [user?._id]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{user?.email}</h2>
      </div>
      <div className="user-posts">
        <h3>Your Posts</h3>
        {userPosts.map((post) => (
          <Post key={post._id} post={post} canEdit={true} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
