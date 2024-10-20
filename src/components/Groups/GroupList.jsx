// GroupList.jsx
import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";

const GroupList = () => {
  const { fetchWithToken } = useContext(SessionContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const fetchedGroups = await fetchWithToken("/api/groups");
        setGroups(fetchedGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Groups</h2>
      {groups.map((group) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
