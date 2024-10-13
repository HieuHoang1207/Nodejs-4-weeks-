const request = require("supertest");
const express = require("express");
const db = require("../config/database");
const userController = require("../controllers/userController");

const app = express();
app.use(express.json());
app.get("/users", userController.getAllUsers);

// Mocking db.query
jest.mock("../config/database", () => ({
  query: jest.fn(),
}));

describe("GET /users", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Dọn dẹp mocks sau mỗi test
  });

  it("should return all users", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "User A",
        phone: "1234567890",
        address: "Address A",
        email: "userA@example.com",
      },
      {
        id: 2,
        name: "User B",
        phone: "0987654321",
        address: "Address B",
        email: "userB@example.com",
      },
    ];

    db.query.mockImplementation((sql, callback) => {
      callback(null, mockUsers); // Trả về dữ liệu giả lập
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers); // Kiểm tra kết quả trả về
  });

  it("should return an empty array if there are no users", async () => {
    db.query.mockImplementation((sql, callback) => {
      callback(null, []); // Trả về mảng rỗng
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Kiểm tra mảng rỗng
  });

  it("should return 500 if there is a database error", async () => {
    db.query.mockImplementation((sql, callback) => {
      callback(new Error("Database error"), null); // Giả lập lỗi
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Lỗi truy vấn dữ liệu");
  });
});
