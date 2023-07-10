import React from "react";
const url_img =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

export default function Header_channels({foundItem}) {
  console.log("foundItemfoundItem",foundItem)
  const avatars = [
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1", alt: "Remy Sharp" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2", alt: "Travis Howard" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3", alt: "Cindy Baker" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4", alt: "Agnes Walker" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5", alt: "Trevor Henderson" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=6", alt: "Trevor Henderson" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=7", alt: "Trevor Henderson" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=8", alt: "Trevor Henderson" },
    { src: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=9", alt: "Trevor Henderson" },
    
  ];

  const maxVisibleAvatars = 4;
  const remainingCount = avatars.length - maxVisibleAvatars;
  return (
    <div className=" px-4 flex items-center justify-between pt-2 pb-2 border-b">
      <div>
        <div>
          <h3 className="text-lg opacity-80"># &nbsp;
         { foundItem.label}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-full flex">
              {avatars.slice(0, maxVisibleAvatars).map((avatar, index) => (
                <img
                  key={index}
                  className={`w-5 h-5 rounded-full object-cover z-1 ${
                    index > 0 ? "-ml-1 -mr-2" : ""
                  }`}
                  src={avatar.src}
                  alt={avatar.alt}
                />
              ))}
              {remainingCount > 0 && (
                <div className="relative w-5 z-0 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">{`+${remainingCount}`}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-500 text-xl w-5 h-5 " />
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="text-[14px] opacity-70 flex">
                <span>13 </span> Members
              </p>
            </div>
          </div>
          <div className="items-center flex gap-4">
            <p>-</p>
            <p className=" text-green-500 text-sm">4 Online</p>
          </div>
        </div>
      </div>
      <div className=" flex gap-7 mr-12">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="h-6 w-6 opacity-70"
          >
            <path d="M19.981,7.023v-6a1,1,0,0,1,2,0v6A1,1,0,0,1,19.981,7.023Zm-3,1a1,1,0,0,0,1-1v-6a1,1,0,0,0-2,0v6A1,1,0,0,0,16.981,8.023Zm6.095,13.116-.912,1.05c-8.19,7.84-28.12-12.084-20.4-20.3l1.15-1A3.08,3.08,0,0,1,7.242.93c.031.03,1.882,2.437,1.882,2.437a3.1,3.1,0,0,1-.005,4.281L7.959,9.1a12.783,12.783,0,0,0,6.932,6.947l1.464-1.165a3.1,3.1,0,0,1,4.282-.007s2.407,1.853,2.438,1.884A3.1,3.1,0,0,1,23.076,21.139ZM21.7,18.216s-2.4-1.842-2.425-1.872a1.121,1.121,0,0,0-1.549,0c-.026.027-2.044,1.635-2.044,1.635a1,1,0,0,1-.979.151A15,15,0,0,1,5.88,9.318a1,1,0,0,1,.146-.995S7.633,6.306,7.661,6.279a1.1,1.1,0,0,0,0-1.55C7.629,4.7,5.788,2.306,5.788,2.306a1.1,1.1,0,0,0-1.51.038L3.127,3.349C-2.513,10.128,14.758,26.442,20.7,20.826l.912-1.05A1.122,1.122,0,0,0,21.7,18.216Z" />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="h-7 w-7 opacity-70"
          >
            <path d="M22.903,6.538c-.676-.338-1.473-.267-2.077,.188-.039,.029-.076,.062-.11,.096l-1.757,1.773c-.211-2.565-2.341-4.594-4.959-4.594H5C2.243,4,0,6.243,0,9v6c0,2.757,2.243,5,5,5H14c2.629,0,4.768-2.047,4.962-4.627l1.756,1.754c.034,.033,.069,.063,.107,.092,.352,.264,.768,.398,1.188,.398,.303,0,.606-.069,.89-.211,.677-.338,1.097-1.019,1.097-1.774v-7.318c0-.757-.42-1.437-1.097-1.775Zm-8.903,11.462H5c-1.654,0-3-1.346-3-3v-6c0-1.654,1.346-3,3-3H14c1.654,0,3,1.346,3,3v6c0,1.654-1.346,3-3,3Zm5-5.417v-1.189l3-3.028,.025,7.238-3.025-3.022Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
