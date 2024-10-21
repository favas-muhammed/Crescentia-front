import React, { useContext, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";

const CreateGroup = () => {
  const [name, setName] = useState("");

  const { fetchWithToken } = useContext(SessionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGroup = await fetchWithToken("/api/groups", "POST", { name });
      console.log("New group created:", newGroup);
      // Reset form or update group list
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group name"
        required
      />
      <button type="submit">Create Group</button>
    </form>
  );
};

export default CreateGroup;
