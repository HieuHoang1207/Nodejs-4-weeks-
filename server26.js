const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

// Cấu hình Socket.io với transport "polling"
const io = socketIo(server, {
  transports: ["polling"], // Chỉ sử dụng long-polling
});

// Khi client kết nối
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Lắng nghe sự kiện 'chatMessage' từ client
  socket.on("chatMessage", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);

    // Gửi lại tin nhắn cho tất cả các client, bao gồm cả client gửi
    io.emit("chatMessage", msg);
  });

  // Khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index26.html");
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
