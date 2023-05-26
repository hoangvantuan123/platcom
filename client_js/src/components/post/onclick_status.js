import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Commentdiv from "./comment";
import Tree_comment from "./tree_comment";
export default function Onclick_status() {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const [isReplyClicked, setIsReplyClicked] = useState(false);
  const [isCommentmarkClicked, setIsCommentmarkClicked] = useState(false);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleBookmarkClick = () => {
    setIsBookmarkClicked(!isBookmarkClicked);
  };

  const handleReplyClick = () => {
    setIsReplyClicked(!isReplyClicked);
  };
  const handleCommentClick = () => {
    setIsCommentmarkClicked(!isCommentmarkClicked);
  };

  return (
    <div>
      <div className="flex items-center mb-2 gap-4">
        <button
          className={`mr-2 focus:outline-none ${
            isHeartClicked ? "text-red-500" : "opacity-80"
          }`}
          onClick={handleHeartClick}
        >
          {isHeartClicked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
        <button
          className={`mr-2 focus:outline-none ${
            isBookmarkClicked
              ? "text-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => {
            handleBookmarkClick();
            handleCommentClick();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            className="h-5 w-5 opacity-80"
          >
            <path d="M24,11.247A12.012,12.012,0,1,0,12.017,24H19a5.005,5.005,0,0,0,5-5V11.247ZM22,19a3,3,0,0,1-3,3H12.017a10.041,10.041,0,0,1-7.476-3.343,9.917,9.917,0,0,1-2.476-7.814,10.043,10.043,0,0,1,8.656-8.761A10.564,10.564,0,0,1,12.021,2,9.921,9.921,0,0,1,18.4,4.3,10.041,10.041,0,0,1,22,11.342Z" />
            <path d="M8,9h4a1,1,0,0,0,0-2H8A1,1,0,0,0,8,9Z" />
            <path d="M16,11H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z" />
            <path d="M16,15H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z" />
          </svg>
        </button>
        <button
          className={`mr-2 focus:outline-none ${
            isReplyClicked
              ? "text-blue-500"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={handleReplyClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="h-5 w-5 opacity-80"
          >
            <path d="M17,19c0,2.76-2.24,5-5,5H5C2.24,24,0,21.76,0,19v-7C0,9.24,2.24,7,5,7h1c.55,0,1,.45,1,1s-.45,1-1,1h-1c-1.65,0-3,1.35-3,3v7c0,1.65,1.35,3,3,3h7c1.65,0,3-1.35,3-3,0-.55,.45-1,1-1s1,.45,1,1Zm6.13-13.11L17.72,.3c-.38-.4-1.02-.41-1.41-.02s-.41,1.02-.02,1.41l5.14,5.3H13c-2.76,0-5,2.24-5,5v5c0,.55,.45,1,1,1s1-.45,1-1v-5c0-1.65,1.35-3,3-3h8.42l-5.14,5.3c-.38,.4-.38,1.03,.02,1.41,.19,.19,.45,.28,.7,.28s.52-.1,.72-.3l5.4-5.57c1.17-1.17,1.17-3.07,.01-4.23Z" />
          </svg>
        </button>
      </div>
      <div className="flex">
        <p className="text-gray-600  text-sm font-semibold">12 likes</p>
      </div>
      <div>
        <h3 className="text-gray-600 text-sm font-semibold">
          Jacob Warnhalter{" "}
          <span className=" font-normal text-xs">
            Lorem Ips orem ipsum dolor sit amet, consectetur
          </span>
        </h3>
      </div>
      <div className="mt-1 cursor-pointer" onClick={handleCommentClick}>
        <p className=" opacity-70 text-xs">See 5 comments</p>
      </div>
      {isCommentmarkClicked && (
        <div className="my-8">
          <Commentdiv />
          <div className="mt-3">
            <Tree_comment />
          </div>
        </div>
      )}
    </div>
  );
}
