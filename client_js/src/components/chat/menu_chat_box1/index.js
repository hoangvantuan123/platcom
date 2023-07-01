import React, { useState, useEffect } from "react";
import {
  fetchDataUserNumbers,
  selectData,
} from "../../../slices/userNumberSlice";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Input } from "antd";
import "./custom_chat_box1_antd.css";
import Header_chat from "./header_chat";

export default function Menu_chat_box1() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authUser.token);
  //console.log("user_token", token);
  const data = useSelector(selectData);
  const [userState, setUserState] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (token) {
      dispatch(fetchDataUserNumbers(token));
    }
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      setUserState(data.app_useraccount); // Gán giá trị data vào userState
    }
  }, [data]);

  //console.log(userState);

  useEffect(() => {
    const newItems = [
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
    ];

    if (userState) {
      const userItems = userState.map((user) => {
        const { id, first_name, last_name, user_status } = user; // Trích xuất giá trị từ đối tượng user trong mảng userState
        return {
          key: id,
          iconStatus: user_status,
          label: first_name + "" + last_name,
        };
      });

      newItems.push({
        key: "sub3",
        add_children: "",
        label: "Direct Messages",
        children: userItems,
      });
    }

    setItems(newItems);
  }, [userState]);

  //console.log(items);

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
      <nav aria-label="Main Nav" className="flex flex-col p-1 mt-4">
        <a
          href=""
          className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="h-4 w-4 opacity-60"
            >
              <path d="M12,0A12.013,12.013,0,0,0,0,12c-.126,9.573,11.159,15.429,18.9,9.817a1,1,0,1,0-1.152-1.634C11.3,24.856,1.9,19.978,2,12,2.549-1.266,21.453-1.263,22,12v2a2,2,0,0,1-4,0V12C17.748,4.071,6.251,4.072,6,12a6.017,6.017,0,0,0,10.52,3.933A4,4,0,0,0,24,14V12A12.013,12.013,0,0,0,12,0Zm0,16a4,4,0,0,1,0-8A4,4,0,0,1,12,16Z" />
            </svg>

            <span className="text-sm font-medium"> Mentions </span>
          </div>

          <span className="shrink-0 rounded-full bg-gray-100 py-0.5 px-3 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700">
            5
          </span>
        </a>

        <a
          href=""
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="w-4 h-4 opacity-60"
          >
            <path d="M23,7H18.191l.8-5.865a1,1,0,1,0-1.982-.27L16.173,7H9.191l.8-5.865A1,1,0,1,0,8.009.865L7.173,7H2A1,1,0,0,0,2,9H6.9l-.818,6H1a1,1,0,0,0,0,2H5.809l-.8,5.865a1,1,0,0,0,1.982.27L7.827,17h6.982l-.8,5.865a1,1,0,0,0,1.982.27L16.827,17H22a1,1,0,0,0,0-2H17.1l.818-6H23A1,1,0,0,0,23,7Zm-7.918,8H8.1l.818-6H15.9Z" />
          </svg>

          <span className="text-sm font-medium"> Theads </span>
        </a>

        <a
          href=""
          className="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              className="w-4 h-4 opacity-60"
            >
              <path d="M19,2h-1V1c0-.552-.447-1-1-1s-1,.448-1,1v1H8V1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM5,4h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3V10H22v9c0,1.654-1.346,3-3,3Zm-1.168-8.848c.384,.397,.372,1.031-.025,1.414l-4.74,4.568c-.553,.553-1.307,.866-2.108,.866s-1.555-.312-2.121-.879l-2.252-2.092c-.404-.376-.428-1.009-.052-1.413,.378-.405,1.01-.427,1.413-.052l2.278,2.117c.433,.43,1.063,.402,1.439,.026l4.754-4.582c.398-.383,1.03-.371,1.414,.026Z" />
            </svg>

            <span className="text-sm font-medium"> Events </span>
          </div>

          <span className="shrink-0 rounded-full bg-gray-100 py-0.5 px-3 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700">
            3
          </span>
        </a>

        <a
          href=""
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
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
            className="h-4 w-4 opacity-60"
          >
            <g>
              <circle cx="256" cy="53.333" r="53.333" />
              <circle cx="256" cy="256" r="53.333" />
              <circle cx="256" cy="458.667" r="53.333" />
            </g>
          </svg>

          <span className="text-sm font-medium"> More </span>
        </a>
      </nav>
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
