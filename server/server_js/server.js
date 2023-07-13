const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const { getMessages } = require("./controllers/messageControllers");
const { handleConnection } = require("./sockets/socketMessageController");
const { handleSocket } = require("./sockets/socketGroupChatController");
const { getGroups } = require("./controllers/groupChatContollers");
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
// Message riêng tư 
io.on("connection", handleConnection);
// Group Chat 
io.on("connection", handleSocket);

// Lấy danh sách tin nhắn từ cơ sở dữ liệu
app.get("/api/messages", getMessages);
// Lấy danh sách nhóm chat từ cơ sở dữ liệu
app.get("/api/group_chat" , getGroups)

// Lắng nghe cổng
const port = process.env.PORT || 5500;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
