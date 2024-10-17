// GroupsPage.jsx
import React from "react";
import GroupList from "../components/Groups/GroupList";
import CreateGroup from "../components/Groups/CreateGroup";

const GroupsPage = () => {
  return (
    <div>
      <h1>Groups</h1>
      <CreateGroup />
      <GroupList />
    </div>
  );
};

export default GroupsPage;
