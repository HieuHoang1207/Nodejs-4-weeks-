// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation for Booking, User and Home Routes",
    },
    servers: [
      {
        url: "http://localhost:3000", // Cấu hình URL của server
      },
    ],
  },
  apis: ["./routes/*.js"], // Đường dẫn đến các file routes để tạo tài liệu API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  // Cấu hình basic auth
  app.use(
    "/docs",
    basicAuth({
      users: {
        [process.env.ADMIN_USER]: process.env.ADMIN_PASS,
        [process.env.ADMIN_USER1]: process.env.ADMIN_PASS1,
      }, // Tài khoản đăng nhập
      challenge: true, // Yêu cầu người dùng nhập tài khoản qua popup
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
  );
};

module.exports = setupSwagger;
