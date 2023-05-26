import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Like_rep_comment() {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };
  return (
    <div className="flex gap-5 mt-1">
      <button
        className={`mr-2 focus:outline-none ${
          isHeartClicked ? "text-red-500" : "opacity-80"
        }`}
        onClick={handleHeartClick}
      >
        {isHeartClicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
      <button>
        <h3 className=" text-sm">Reply</h3>
      </button>
    </div>
  );
}
