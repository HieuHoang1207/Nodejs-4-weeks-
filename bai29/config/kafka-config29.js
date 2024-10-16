// src/config/kafka-config29.js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Địa chỉ broker Kafka
});

module.exports = kafka;
