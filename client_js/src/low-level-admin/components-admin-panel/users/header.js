import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space } from "antd";
import DialogUserAccount from "./dialogUserAccount";
import ImportDialogUserAccount from "./importDialogUserAccount";
import ViewUserAccount from "./viewUserAccount";

const items = [
  {
    label: <DialogUserAccount />,
    key: "0",
  },
  {
    label: <ImportDialogUserAccount />,
    key: "1",
  },
];
const items_export = [
  {
    label: "One",
    key: "0",
  },

  {
    label: "Two",
    key: "1",
  },
];
export default function Header_Users() {
  return (
    <div className="flex gap-4">
      <div>
        <Dropdown
          overlay={
            <Menu>
              {items.map((item) => {
                if (item.type === "divider") {
                  return <Menu.Divider key={item.key} />;
                }
                return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
              })}
            </Menu>
          }
          trigger={["click"]}
        >
          <button
            onClick={(e) => e.preventDefault()}
            className=" cursor-pointer border px-4 py-2   rounded-lg"
          >
            <Space className=" text-sm opacity-90" >Add users</Space>
          </button>
        </Dropdown>
      </div>
      <div>
        <Dropdown
          overlay={
            <Menu>
              {items_export.map((item) => {
                if (item.type === "divider") {
                  return <Menu.Divider key={item.key} />;
                }
                return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
              })}
            </Menu>
          }
          trigger={["click"]}
        >
          <button
            onClick={(e) => e.preventDefault()}
            className=" cursor-pointer border px-4 py-2 rounded-lg"
          >
            <Space className=" text-sm opacity-90">Export Data</Space>
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
