import reactionService from "../../services/reaction.service";

const ReactionButton = ({ postId, type, count, userReacted }) => {
  const handleReact = async () => {
    try {
      await reactionService.toggleReaction(postId, type);
      // Refresh reactions count
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleReact}>
      {type === "heart" ? "❤️" : "🙌"} ({count})
    </button>
  );
};

export default ReactionButton;
