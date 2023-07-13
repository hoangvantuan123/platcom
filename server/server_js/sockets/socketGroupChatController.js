const pool = require("../config/dbConfig");
const { v4: uuidv4 } = require("uuid");

// Xử lý kết nối Socket.io
const handleSocket = (socket) => {
  console.log("New client connected group chats");

  // Tạo nhóm chat mới
  socket.on("createGroup", (data) => {
    const { groupName, memberId } = data;

    const groupId = uuidv4(); // Tạo UUID mới

    // Tạo một mảng JSON chứa thành viên
    const membersArray = JSON.stringify(memberId);

    // Thực hiện INSERT vào bảng nhóm chat và cập nhật danh sách thành viên
    pool.query(
      "INSERT INTO groups (id, name, members) VALUES ($1, $2, $3::json) RETURNING id, members",
      [groupId, groupName, membersArray],
      (error, results) => {
        if (error) {
          console.error("Error creating group:", error);
        } else {
          const members = results.rows[0].members;

          console.log("Group created and member added:", members);
          socket.emit("groupCreated", groupId);
        }
      }
    );
  });
  // Thêm nhiều thành viên vào nhóm chat
  socket.on("addMembersToGroup", (data) => {
    const { groupId, memberIds } = data;

    // Lấy danh sách thành viên hiện tại của nhóm
    pool.query(
      "SELECT members FROM groups WHERE id = $1",
      [groupId],
      (error, results) => {
        if (error) {
          console.error("Error retrieving group members:", error);
        } else {
          const currentMembers = results.rows[0].members;

          let membersArray;

          // Kiểm tra và xử lý nếu danh sách thành viên hiện tại là null hoặc không phải mảng
          if (currentMembers === null || !Array.isArray(currentMembers)) {
            membersArray = memberIds; // Sử dụng danh sách thành viên mới nếu danh sách cũ không hợp lệ
          } else {
            membersArray = [...currentMembers, ...memberIds]; // Kết hợp danh sách thành viên hiện tại và danh sách mới
          }

          // Cập nhật danh sách thành viên trong cơ sở dữ liệu
          pool.query(
            "UPDATE groups SET members = $1::json WHERE id = $2",
            [JSON.stringify(membersArray), groupId],
            (updateError) => {
              if (updateError) {
                console.error("Error updating group members:", updateError);
              } else {
                console.log("Members added to group:", membersArray);
                socket.emit("membersAddedToGroup", membersArray);
              }
            }
          );
        }
      }
    );
  });
  socket.on("chat group message", (message) => {
    // Lưu tin nhắn vào CSDL
    const messageId = uuidv4(); // Tạo UUID mới
    pool.query(
      "INSERT INTO messages (id, content, sender_id, receiver_group_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        messageId,
        message.content,
        message.sender_id,
        message.receiver_group_id,
      ],
      (error, results) => {
        if (error) {
          throw error;
        }

        const savedMessage = results.rows[0];

        // Gửi tin nhắn đến người gửi
        socket.emit("group chat message", savedMessage);

        // Gửi tin nhắn đến tất cả người dùng khác
        socket.broadcast.emit("group chat message", savedMessage);
      }
    );
  });

  // Xử lý khi người dùng ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

module.exports = { handleSocket };
