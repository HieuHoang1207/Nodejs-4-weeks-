// redis25.js
const redis = require("redis");

// Tạo redis client
const client = redis.createClient({
  url: "redis://localhost:6379", // sử dụng url cho kết nối
});

// Xử lý các sự kiện kết nối và lỗi
client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

// Kết nối Redis (không cần async/await ở đây)
client
  .connect()
  .then(() => {
    console.log("Redis client connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to Redis", err);
  });

module.exports = client;
