import React, { useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import "./Reactions.css";

const Reactions = ({ itemId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [error, setError] = useState(null);

  const handleReaction = async (type) => {
    try {
      const response = await axios.post("/api/reactions", {
        itemId,
        reactionType: type,
        
      });

      if (response?.status === 200) {
        if (type === "like") {
          setLikeCount((prev) => prev + 1);
        } else if (type === "love") {
          setLoveCount((prev) => prev + 1);
        }
      } else {
        throw new Error("Unexpected response status: " + response?.status);
      }
    } catch (error) {
      setError("Failed to send reaction. Please try again later.");
      console.error("Failed to send reaction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="icons-Box">
        <button
          onClick={() => handleReaction("like")}
          className="icon_itself"
        >
          <AiFillLike size={24} /> {likeCount}
        </button>

        <button
          onClick={() => handleReaction("dislike")}
          className="icon_itself"
        >
          <AiFillDislike size={24} />
        </button>

        <button
          onClick={() => handleReaction("love")}
          className="icon_itself"
        >
          <AiOutlineHeart size={24} /> {loveCount}
        </button>
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default Reactions;
