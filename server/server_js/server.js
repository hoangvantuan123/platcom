const express = require("express");
const http = require("http");
const { Pool } = require("pg");
const cors = require("cors");
const socketIo = require("socket.io");
const { getMessages } = require("./controllers/messageControllers");
const { handleConnection } = require("./sockets/socketController");

const app = express();
const server = http.createServer(app);

// Cấu hình Cors
app.use(cors());

// Khởi tạo Socket.io với Cors
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// Xử lý kết nối Socket.io
io.on("connection", handleConnection);

// Lấy danh sách tin nhắn từ cơ sở dữ liệu
app.get("/api/messages", getMessages);

// Lắng nghe cổng 5000
server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
