import React from "react";
import { useParams } from "react-router-dom";

const GroupDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="group-detail-page">
      <h1>Group Details</h1>
      <p>Group ID: {id}</p>
    </div>
  );
};

export default GroupDetailPage;
