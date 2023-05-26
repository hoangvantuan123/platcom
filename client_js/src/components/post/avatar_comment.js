import React, { useState } from "react";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  rem,
} from "@mantine/core";
import Like_rep_comment from "./like_rep_comment";

const comments = [
  {
    commentAt:
      "Lorem Ips orem ipsum dolor sit amet,um dolor sit amet,um dolor sit amet,um dolor sit amet, consectetur adipiscing elit. Sed gravida eros vel dolor ullamcorper, vel elementum tortor aliquet.",
    time: "3h ago",
    author: {
      name: "Jacob Warnhalter",
      image:
        "https://images.unsplash.com/photo-1684612957367-b1c208531c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  },
  // Thêm các comment khác vào đây
];

export default function Avatar_Comment({
  commentAt,
  body,
  author,
  comment,
  index,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleTextClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {comments.map((comment, index) => (
        <div radius="md" key={index}>
          <div className=" flex gap-2 p-1">
            <div>
              <Avatar
                src={comment.author?.image}
                alt={comment.author?.name}
                radius="xl"
              />
            </div>
            <div className="max-w-[500px]">
              <div>
                <Text fz="sm">
                  {comment.author?.name}{" "}
                  <span className=" text-xs opacity-70">{comment.time}</span>
                </Text>
                <Text fz="xs" c="dimmed" onClick={handleTextClick}>
                  {expanded
                    ? comment.commentAt
                    : comment.commentAt.substring(0, 100)}
                  {comment.commentAt.length > 100 && (
                    <span>{expanded ? "" : " ...Xem thêm"}</span>
                  )}
                </Text>
              </div>
              <Like_rep_comment />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
