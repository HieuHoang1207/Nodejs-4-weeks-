const { Kafka, Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner, // Sử dụng Legacy Partitioner
});

const runProducer = async () => {
  await producer.connect();

  // Gửi message với key
  const messages = [
    { key: "user1", value: "Hello KafkaJS 29!" },
    { key: "user2", value: "Another message" },
    { key: "user1", value: "Message for user1 again" },
  ];

  for (const message of messages) {
    await producer.send({
      topic: "my-topic",
      messages: [message],
    });
    console.log(`Produced message: ${message.value}`);
  }

  await producer.disconnect();
};

runProducer().catch(console.error);
