import React from "react";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
} from "@mantine/core";

const comments = [
    {
      postedAt: "10 minutes ago",
      author: {
        name: "Jacob Warnhalter",
        image:
          "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      },
    },
    // Thêm các comment khác vào đây
  ];
  

export default function AvatarPost({ postedAt, body, author }) {
  
  return (
    <div>
      {comments.map((comment, index) => (
        <Paper  radius="md"  key={index}>
          <Group>
            <Avatar
              src={comment.author?.image}
              alt={comment.author?.name}
              radius="xl"
            />
            <div>
              <Text fz="sm">{comment.author?.name}</Text>
              <Text fz="xs" c="dimmed">
                {comment.postedAt}
              </Text>
            </div>
          </Group>
        
        </Paper>
      ))}
    </div>
  );
}
