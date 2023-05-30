import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
} from "@mantine/core";
const data = [
  {
    avatar:
      "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "rob_wolf@gmail.com",
    role: "Collaborator",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "jj@breaker.com",
    role: "Collaborator",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Henry Silkeater",
    job: "Designer",
    email: "henry@silkeater.io",
    role: "Contractor",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Bill Horsefighter",
    job: "Designer",
    email: "bhorsefighter@gmail.com",
    role: "Contractor",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    role: "Manager",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    role: "Manager",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    role: "Manager",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    role: "Manager",
  },
];
console.log(data);
export default function Members() {
  const [visibleMembers, setVisibleMembers] = useState(5); // Số lượng thành viên hiển thị ban đầu
  const [expanded, setExpanded] = useState(false); // Trạng thái hiển thị/ẩn của danh sách

  const handleLoadMore = () => {
    // Tăng số lượng thành viên hiển thị
    setVisibleMembers((prevVisibleMembers) =>
      Math.min(prevVisibleMembers + 5, data.length)
    );
    setExpanded(true); // Mở rộng danh sách khi bấm nút "Xem thêm"
  };

  const handleToggleExpand = () => {
    // Đảo ngược trạng thái hiển thị/ẩn của danh sách
    setExpanded((prevExpanded) => !prevExpanded);
    setVisibleMembers(5); // Thiết lập lại số lượng thàh viên khi hiển thị
  };
  // Hiển thị số lượng thành viên ( tối đa là số lượng thành viên hoặc số lượng hiển thị)
  const count = data.length - visibleMembers;
  return (
    <div>
      {data.slice(0, visibleMembers).map((item) => {
        return (
          <div className=" flex items-center justify-between">
            <Group
              spacing="sm"
              key={item.name}
              className=" mb-2 cursor-pointer"
            >
              <Avatar size={40} src={item.avatar} radius={40} />
              <div>
                <Text fz="sm" fw={500}>
                  {item.name}
                </Text>
                <Text fz="xs" c="dimmed">
                  {item.email}
                </Text>
              </div>
            </Group>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className="h-4 w-4 opacity-70"
              >
                <g>
                  <circle cx="256" cy="53.333" r="53.333" />
                  <circle cx="256" cy="256" r="53.333" />
                  <circle cx="256" cy="458.667" r="53.333" />
                </g>
              </svg>
            </button>
          </div>
        );
      })}
      {visibleMembers < data.length && !expanded && (
        <div onClick={handleLoadMore} className="cursor-pointer mt-3">
          ({count}+) more
        </div>
      )}

      {expanded && (
        <div onClick={handleToggleExpand} className="cursor-pointer mt-3">
          Thu gọn
        </div>
      )}
    </div>
  );
}
