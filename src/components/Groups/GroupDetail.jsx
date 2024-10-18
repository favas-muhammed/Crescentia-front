import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SessionContext } from "../../contexts/SessionContext";
import PostItem from "../Posts/PostItem";

const GroupDetail = () => {
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const { groupId } = useParams();
  const { fetchWithToken } = useContext(SessionContext);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupData = await fetchWithToken(`/api/groups/${groupId}`);
        setGroup(groupData);
        const groupPosts = await fetchWithToken(`/api/posts/group/${groupId}`);
        setPosts(groupPosts);
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };
    fetchGroupDetails();
  }, [groupId, fetchWithToken]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <h3>Members:</h3>
      <ul>
        {group.members.map((member) => (
          <li key={member._id}>{member.username}</li>
        ))}
      </ul>
      <h3>Posts:</h3>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default GroupDetail;
