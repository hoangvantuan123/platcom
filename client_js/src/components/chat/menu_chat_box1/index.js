import React, { useState } from "react";
import { Badge, Space } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Menu, Input } from "antd";
import "./custom_chat_box1_antd.css";
import Header_chat from "./header_chat";
const items = [
  { type: "divider" },
  {
    key: "sub1",
    add_children: "",
    label: "Starred",
    children: [
      {
        key: "g1",
        label: "Item 1",
        type: "group",
        iconStatus: "#",
      },
      {
        key: "g2",
        label: "Item 2",
        type: "group",
        iconStatus: "#",
      },
    ],
  },
  {
    key: "sub2",
    add_children: "",
    label: "Channels",
    children: [
      { key: "5", iconStatus: "#", label: "Option 5" },
      { key: "6", iconStatus: "#", label: "Option 6" },
    ],
  },
  {
    key: "sub3",
    add_children: "",
    label: "Direct Messages",

    children: [
      { key: "9", iconStatus: "online", label: "Option 9" },
      { key: "10", iconStatus: "offline", label: "Option 10" },
      { key: "11", iconStatus: "online", label: "Option 11" },
      { key: "12", iconStatus: "offline", label: "Option 12" },
    ],
  },
];

export default function Menu_chat_box1() {
  const onClick = (e) => {
    if (e.key === "newItem") {
    } else {
      console.log("Click ", e);
    }
  };
  const renderIcon = (iconStatus) => {
    if (iconStatus === "online") {
      return <div class="w-2 h-2 rounded-full bg-green-500"></div>;
    }
    if (iconStatus === "offline") {
      return <div class="w-2 h-2 rounded-full bg-gray-300"></div>;
    }
    if (iconStatus === "#") {
      return <div>#</div>;
    }
    return null;
  };
  const renderMenuItems = (items) => {
    return items.map((item) =>
      item.type === "divider" ? (
        <Menu.Divider key={item.key} />
      ) : (
        <Menu.SubMenu key={item.key} title={item.label}>
          {item.children &&
            item.children.map((child) => (
              <Menu.Item key={child.key}>
                <div>{renderIcon(child.iconStatus)}</div>

                {child.label}
              </Menu.Item>
            ))}
        </Menu.SubMenu>
      )
    );
  };

  return (
    <div>
      <Header_chat />
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2", "sub3"]}
        mode="inline"
      >
        {renderMenuItems(items)}
      </Menu>
    </div>
  );
}
