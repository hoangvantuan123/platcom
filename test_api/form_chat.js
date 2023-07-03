import React, { useState, useEffect } from "react";

function File_UI() {
  const userList = [
    { id: 1, name: "Người dùng 1", messages: ["Tin nhắn 1", "Tin nhắn 2"] },
    { id: 2, name: "Người dùng 2", messages: ["Tin nhắn 3", "Tin nhắn 4"] },
    { id: 3, name: "Người dùng 3", messages: ["Tin nhắn 5", "Tin nhắn 6"] },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  return (
    <div className="chat-container ml-64">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Danh sách người dùng</h1>
        <ul className="mb-4">
          {userList.map((user) => (
            <li
              key={user.id}
              className="py-2 px-4 bg-gray-200 rounded-md cursor-pointer mb-2 hover:bg-gray-300"
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>

        <div>
          <h2 className="text-2xl font-bold mb-4">Khung chat</h2>
          {selectedUser ? (
            <div>
              <h3 className="text-lg font-bold mb-2">{selectedUser.name}</h3>
              <ul className="bg-gray-200 p-4 rounded-md">
                {selectedUser.messages.map((message, index) => (
                  <li key={index} className="mb-2">
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Vui lòng chọn một người dùng để xem khung chat</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default File_UI;
