import React, { useState } from "react";
import Box_Channels_UI from "./box_channels";
import "./css/style.css";
import Header_channels from "./box_channels/header_channels";
import Header_right_info_channels from "./box_channels/header_right_info_channels";
import Textareas_UI from "./box_channels/textareas_chat";
import "./css/style.css";
import Content_Chat from "./box_channels/content_chat";
export default function Chat_box2({ items, clickedItem }) {
  console.log("clickedItem", clickedItem);
  //console.log("Items chat box2", items);
  const [showSubscreen, setShowSubscreen] = useState(true);
  const [mainScreenCollapsed, setMainScreenCollapsed] = useState(true);
  const [foundItem, setFoundItem] = useState("");

  // Kiểm tra key có trùng trong items(data)
  const handleCheckKey = () => {
    if (clickedItem && items) {
      for (const item of items) {
        if (item.children && Array.isArray(item.children)) {
          const found = item.children.find((child) => child.key === clickedItem.key);

          if (found) {
            setFoundItem(found);
            break;
          }
        }
      }
    }
  };

  // Gọi hàm handleCheckKey khi clickedItem hoặc items thay đổi
  React.useEffect(() => {
    handleCheckKey();
  }, [clickedItem, items]);

  console.log('foundItem', foundItem);

  const toggleSubscreen = () => {
    setShowSubscreen(!showSubscreen);
    setMainScreenCollapsed(!showSubscreen);
  };

  const toggleMainScreen = () => {
    setMainScreenCollapsed(!mainScreenCollapsed);
  };

  return (
    <div className="">
      {showSubscreen && (
        <div className="fixed right-0 bottom-0 w-[20%] h-screen transition-transform transform ease-in-out duration-300">
          <button
            onClick={toggleSubscreen}
            className="w-5 h-12  absolute -left-3 top-3 p-2 text-gray-600 border  rounded-md bg-gray-50 hover:bg-gray-100 hover:text-gray-700"
          >
            {/*    <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              className="w-5 h-5 opacity-50"
            >
              <path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" />
              <path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" />
            </svg> */}
          </button>

          <div>
            <Header_right_info_channels />
          </div>
        </div>
      )}
      <div
        className={`h-screen border-e transition-width duration-300 ease-in-out  ${
          mainScreenCollapsed ? "w-[75.2%]" : "w-full"
        }`}
      >
        <div className="flex h-screen  flex-col justify-between border-e scroll-container bg-white transform  overflow-x-hidden">
          {!showSubscreen && (
            <button
              className=" absolute top-3 right-2 px-4 py-2  text-white rounded"
              onClick={toggleSubscreen}
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
                className="h-6 w-6 opacity-70"
              >
                <g>
                  <circle cx="256" cy="53.333" r="53.333" />
                  <circle cx="256" cy="256" r="53.333" />
                  <circle cx="256" cy="458.667" r="53.333" />
                </g>
              </svg>
            </button>
          )}
          <div className=" top-0 ">
            <Header_channels  foundItem={foundItem}/>
          </div>
          <div className=" overflow-y-auto scroll-container">
            <div className="h-screen p-4 overflow-auto scrollable-content overflow-y-auto scroll-container ">
              <Content_Chat foundItem={foundItem} />
            </div>
          </div>
          <div className="scroll-container p-6">
            <Textareas_UI foundItem={foundItem}/>
          </div>
        </div>
      </div>
    </div>
  );
}
