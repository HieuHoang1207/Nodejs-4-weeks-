// src/kafka/consumer29.js
const kafka = require("../config/kafka-config29"); // Import cấu hình Kafka

const consumer = kafka.consumer({ groupId: "my-group" });

const consumeMessages = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "my-topic", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  } catch (error) {
    console.error(`Failed to consume message: ${error.message}`);
  }
};

module.exports = { consumeMessages };
