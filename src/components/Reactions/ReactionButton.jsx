import React from "react";
import reactionService from "../../services/reaction.service";

const ReactionButton = ({ postId, reactionType, count, userReacted }) => {
  const handleReaction = async () => {
    if (userReacted) {
      await reactionService.removeReaction(postId, reactionType);
    } else {
      await reactionService.addReaction(postId, reactionType);
    }
    // You might want to update the reaction count after adding/removing
  };

  return (
    <button onClick={handleReaction}>
      {reactionType} ({count})
    </button>
  );
};

export default ReactionButton;
