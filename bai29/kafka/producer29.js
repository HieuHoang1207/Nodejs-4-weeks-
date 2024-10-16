// src/kafka/producer29.js
const kafka = require("../config/kafka-config29"); // Import cấu hình Kafka
const { Partitioners } = require("kafkajs");

//dùng để chọn cách gửi thông điệp tới các partition
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const produceMessage = async (message) => {
  try {
    await producer.connect();
    await producer.send({
      topic: "my-topic", // Tên topic
      messages: [{ value: message }],
    });
    console.log(`Produced message: ${message}`);
  } catch (error) {
    console.error(`Failed to produce message: ${error.message}`);
  } finally {
    await producer.disconnect();
  }
};

module.exports = { produceMessage };
