import React from "react";
import Members from "./members";
import ScrollDialog from "./dialog_scroll_paper_file";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
export default function Header_right_info_channels() {
  const avatars = [
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      alt: "Remy Sharp",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      alt: "Travis Howard",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
      alt: "Cindy Baker",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
      alt: "Agnes Walker",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
      alt: "Trevor Henderson",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=6",
      alt: "Trevor Henderson",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=7",
      alt: "Trevor Henderson",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=8",
      alt: "Trevor Henderson",
    },
    {
      src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=9",
      alt: "Trevor Henderson",
    },
  ];

  const maxVisibleAvatars = 4;
  const remainingCount = avatars.length - maxVisibleAvatars;
  return (
    <div className="pt-2 pb-2 h-screen overflow-auto scrollable-content overflow-y-auto scroll-container  ">
      <div className="border-b flex justify-center items-center">
        <div className="p-[16px] text-center text-lg opacity-80">
          Detail Channels
        </div>
      </div>

      <div className="p-4 ">
        <div>
          <div>
            <h4 className=" text-sm opacity-60 mb-2"> NAME CHANNELS</h4>
            <h3 className="text-lg opacity-80"># Box Channels</h3>
          </div>
          <div className="mt-4">
            <h4 className=" text-sm opacity-60 mb-2"> ABOUT</h4>
            <p className=" text-sm opacity-80">
              Magna ut laborum veniam magna eiusmod ut minim.
            </p>
          </div>
        </div>
        <div className="border-b mt-5 mb-5 "></div>
        <div>
          <div>
            <div className="flex  justify-between items-center">
              <h4 className=" text-sm opacity-60 mb-2"> MEMBERS</h4>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z" />
                  <path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z" />
                  <path d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z" />
                </svg>
              </button>
            </div>
            <div>
              <Members />
            </div>
          </div>
        </div>
        <div className="border-b mt-5 mb-5 "></div>
        <div>
          <div className="flex  justify-between items-center">
            <h4 className=" text-sm opacity-60 mb-2"> FILES</h4>
            <ScrollDialog />
          </div>
          <div>
            <div className="w-full flex gap-1">
              {avatars.slice(0, maxVisibleAvatars).map((avatar, index) => (
                <img
                  key={index}
                  className={`w-14 h-14 rounded-xl object-cover z-1 ${
                    index > 0 ? "" : ""
                  }`}
                  src={avatar.src}
                  alt={avatar.alt}
                />
              ))}
              {remainingCount > 0 && (
                <div className="relative w-14 z-0 h-14 rounded-xl bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">{`+${remainingCount}`}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500 text-xl w-5 h-5 " />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex  justify-between items-center">
            <h4 className=" text-sm opacity-60 mb-2"> SETTING </h4>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Outline"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 opacity-70"
                >
                  <path d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z" />
                </svg>
                <span>Notification</span>
              </div>
              <div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 p-4">
        <button
          type="button"
          className="border p-2 rounded-xl w-full bg-gray-50 hover:bg-gray-100 hover:text-gray-700"
        >
          Out Channels
        </button>
      </div>
    </div>
  );
}
