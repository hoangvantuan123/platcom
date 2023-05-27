import React, { useState } from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Menu, Input } from "antd";
import "./custom_chat_box1_antd.css"
const items = [
  { type: "divider" },
  {
    key: "sub1",
    add_children: "",
    label: "Navigation One",
    children: [
      {
        key: "g1",
        label: "Starred",
        type: "group",
        children: [
          { key: "1", label: "Option 1" },
          { key: "2", label: "Option 2" },
        ],
      },
      {
        key: "g2",
        label: "Item 2",
        type: "group",
      },
    ],
  },
  {
    key: "sub2",
    add_children: "",
    label: "Channels",
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
    ],
  },
  {
    key: "sub3",
    add_children: "",
    label: "Direct Messages",

    children: [
      { key: "9", icon_status: "online", label: "Option 9" },
      { key: "10", icon_status: "offline", label: "Option 10" },
      { key: "11", icon_status: "online", label: "Option 11" },
      { key: "12", icon_status: "off", label: "Option 12" },
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

  const renderMenuItems = (items) => {
    return items.map((item) =>
      item.type === "divider" ? (
        <Menu.Divider key={item.key} />
      ) : (
        <Menu.SubMenu key={item.key} title={item.label}>
          {item.children &&
            item.children.map((child) => (
              <Menu.Item key={child.key} >
                {child.label}
              </Menu.Item>
            ))}
        </Menu.SubMenu>
      )
    );
  };

  const renderIcon = (iconStatus) => {
    if (iconStatus === "online") {
      return <CheckCircleOutlined style={{ color: "green" }} />;
    }
    if (iconStatus === "offline") {
      return <ExclamationCircleOutlined style={{ color: "yellow" }} />;
    }
    if (iconStatus === "off") {
      return <CloseCircleOutlined style={{ color: "red" }} />;
    }
    return null;
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1", "sub2", "sub3"]}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
}
