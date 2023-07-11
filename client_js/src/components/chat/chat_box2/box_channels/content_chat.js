import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  fetchAndListenForMessages,
} from "../../../../slices/messagesSlice";

const Content_Chat = ({ foundItem }) => {
  const dispatch = useDispatch();
  const id_user = useSelector((state) => state.authUser.id_user);
  //console.log("id_user", id_user);
  const messages = useSelector((state) => state.chat.messages);
  //console.log(messages);
  useEffect(() => {
    dispatch(fetchAndListenForMessages());
  }, [dispatch]);

  // bị lỗi khi gửi sẽ có một id thuộc tính ảo như thế xuất hiện
  // Nhg load trang thì id ảo đó biến mất
  // Chưa tìm ra lỗi đó ở đâu
  // Cách khác phục là kiểm tra id trùng thi loại bỏ id đấy đi lấy id duy nhất
  const uniqueMessages = messages.reduce((uniqueList, message) => {
    // Kiểm tra nếu key đã tồn tại trong danh sách duy nhất
    if (!uniqueList.find((item) => item.id === message.id)) {
      uniqueList.push(message); // Thêm message vào danh sách duy nhất
    }
    return uniqueList;
  }, []);

  //console.log(uniqueMessages);

  // Tìm dữ liệu trùng khớp
  // Mảng để lưu trữ dữ liệu trùng khớp
  const duplicates = [];
  // Tìm dữ liệu trùng khớp và thêm vào mảng duplicates
  uniqueMessages.forEach((item) => {
    if (
      (item.sender_id === id_user || item.sender_id === foundItem.key) &&
      (item.receiver_id === id_user || item.receiver_id === foundItem.key)
    ) {
      duplicates.push(item);
    }
  });

  // Hiển thị dữ liệu trùng khớp
  /*  if (duplicates.length > 0) {
    console.log("Có dữ liệu trùng khớp:");
    console.log(duplicates)
  } else {
    console.log("Không có dữ liệu trùng khớp.");
  } */
  
  // Đoạn code kiểm tra nếu như giá trị sender_id mà trùng với id_user thì nó sẽ hiển thị bên phải còn không thì nó hiển thị bên trái
  const renderChat = () => {
    return duplicates.map((chat, index) => {
      const isUserSender = chat.sender_id === id_user;
      const isRightSide = isUserSender;
      return (
        <div
          key={index}
          className={`p-2 rounded ${
            isRightSide
              ? "bg-green-500 text-white self-end"
              : "bg-gray-200 text-black self-start"
          }`}
        >
          {chat.content}
        </div>
      );
    });
  };

  return (
    <div className="">
      {/* <h1>Real-time Chat</h1>
      <ul>
        {duplicates.map((message, index) => (
          <div key={message.id}>
            <p>Content: {message.content}</p>
          </div>
        ))}
      </ul> */}
      <div className="flex flex-col gap-4">{renderChat()}</div>
    </div>
  );
};

export default Content_Chat;
