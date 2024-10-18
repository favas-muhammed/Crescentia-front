import React from "react";
import { Link } from "react-router-dom";

const GroupItem = ({ group }) => {
  return (
    <div>
      <h3>
        <Link to={`/groups/${group._id}`}>{group.name}</Link>
      </h3>
      <p>{group.description}</p>
      <p>Members: {group.members.length}</p>
    </div>
  );
};

export default GroupItem;
