// GroupItem.jsx
import React from "react";

const GroupItem = ({ group }) => {
  return (
    <div>
      <h3>{group.name}</h3>
      <p>Members: {group.members.length}</p>
      <p>Posts: {group.posts.length}</p>
    </div>
  );
};

export default GroupItem;
