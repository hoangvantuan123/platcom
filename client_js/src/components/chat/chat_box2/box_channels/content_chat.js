import React from "react";

const messages = [
  {
    id: 1,
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    name: "John",
    message: "Hello!",
    timestamp: "2023-06-01 10:00:00",
    isMe: false,
  },
  {
    id: 2,
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    name: "Emily",
    message: "Hi John!",
    timestamp: "2023-06-01 10:02:00",
    isMe: false,
  },
  {
    id: 3,
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    name: "John",
    message: "How are you?",
    timestamp: "2023-06-01 10:05:00",
    isMe: true,
  },
  {
    id: 4,
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    name: "Emily",
    message: "I'm good, thanks!",
    timestamp: "2023-06-01 10:07:00",
    isMe: false,
  },
  // Thêm tin nhắn khác ở đây
];

const ChatMessage = ({ avatar, name, message, isMe, timestamp, onReply }) => {
  const messageContainerClass = isMe
    ? "flex items-start space-x-3 justify-end"
    : "flex items-start space-x-3";

  const messageTextClass = isMe
    ? "bg-blue-500 text-white rounded-lg p-2"
    : "bg-gray-200 rounded-lg p-2";

  return (
    <div className={messageContainerClass}>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          {!isMe && (
            <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          )}
          <span className="font-bold">{name}</span>
          <span className="text-gray-500 text-sm">{timestamp}</span>
        </div>
        <p className={messageTextClass}>{message}</p>
        <button
          onClick={onReply}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Reply
        </button>
      </div>
      {isMe && (
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
      )}
    </div>
  );
};

const Content_Chat = () => {
  return (
    <div>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          avatar={message.avatar}
          name={message.name}
          message={message.message}
          timestamp={message.timestamp}
          isMe={message.isMe}
          onReply={() => console.log("Reply clicked")}
        />
      ))}
    </div>
  );
};

export default Content_Chat;
