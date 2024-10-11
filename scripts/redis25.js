const redis = require("redis");

async function main() {
  // Tạo một client Redis mới
  const client = redis.createClient({
    host: "127.0.0.1", // Địa chỉ Redis server
    port: 6379, // Địa chỉ Redis server
    password: "",
  });

  // host: "127.0.0.1", // Địa chỉ Redis server
  // port: 6379, // Cổng Redis
  // Kết nối tới Redis
  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();

  try {
    // Set một giá trị
    await client.set("myKey", "Hello, Redis!");
    console.log("Value set in Redis");

    // Get giá trị
    const value = await client.get("myKey");
    console.log("Value from Redis:", value);
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // Đóng client sau khi hoàn thành
    await client.quit();
    console.log("Redis client closed");
  }
}

// Gọi hàm main để chạy ứng dụng
main().catch(console.error);
