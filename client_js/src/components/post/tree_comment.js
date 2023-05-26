import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import Avatar_Comment from "./avatar_comment";

const treeData = [
  {
    title:"Xem Thêm" ,
    key: "0-0",
    children: [
      {
        title: <Avatar_Comment/>,
        key: "0-0-0",
        children: [
          {
            title: <Avatar_Comment/>,
            key: "0-0-0-0",
          },
          {
            title: <Avatar_Comment/>,
            key: "0-0-0-1",
          },
          {
            title: <Avatar_Comment/>,
            key: "0-0-0-2",
          },
        ],
      },
      {
        title: <Avatar_Comment/>,
        key: "0-0-1",
        children: [
          {
            title: <Avatar_Comment/>,
            key: "0-0-1-0",
          },
        ],
      },
      {
        title: <Avatar_Comment/>,
        key: "0-0-2",
        children: [
          {
            title: <Avatar_Comment/>,
            key: "0-0-2-0",
          },
          {
            title: <Avatar_Comment/>,
            key: "0-0-2-1",
          },
        ],
      },
    ],
  },
];
export default function Tree_comment() {
  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  return (
    <div>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={["0-0-0"]}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
}
