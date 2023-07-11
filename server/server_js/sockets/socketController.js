// sockets/socketController.js
const pool = require("../config/dbConfig");

// Xử lý kết nối Socket.io
const handleConnection = (socket) => {
  console.log("New client connected");

  // Gửi tin nhắn đến tất cả người dùng khác khi có tin nhắn mới
  socket.on("chat message", (message) => {
    // Lưu tin nhắn vào CSDL
    // INSERT INTO messages (content) VALUES ($1) RETURNING * thực hiện câu truy vấn SQL để chèn dữ liệu mới vào bảng messages
    // [message] Đây là một mảng các tham số được truyền vào câu truy vấn. Và message là giá trị sẽ được chèn vào content
    // (error, results) lỗi thì báo error thành công thì báo results

    pool.query(
      "INSERT INTO messages (content, sender_id, receiver_id) VALUES ($1, $2, $3) RETURNING *",
      [message.content, message.sender_id, message.receiver_id],
      (error, results) => {
        if (error) {
          throw error;
        }

        const savedMessage = results.rows[0];

        // Gửi tin nhắn đến người gửi
        socket.emit("chat message", savedMessage);

        // Gửi tin nhắn đến tất cả người dùng khác
        socket.broadcast.emit("chat message", savedMessage);
      }
    );
  });

  // Xử lý khi người dùng ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

module.exports = { handleConnection };
