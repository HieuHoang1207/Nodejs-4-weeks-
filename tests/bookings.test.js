const request = require("supertest");
const express = require("express");
const app = express();
const db = require("../config/database");
const bookingController = require("../controllers/bookingController");

// Khởi động server cho việc kiểm tra
app.get("/bookings/:userId", bookingController.getBookingsByUserId);

// Mocking db.query
jest.mock("../config/database", () => ({
  query: jest.fn(),
}));

describe("GET /bookings/:userId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return bookings for a valid userId", async () => {
    const mockData = [
      {
        id: 4,
        hotel_id: null,
        name: "Room 101",
        area: 30,
        floor: 1,
        type: "Single",
        status: "Available",
        price: "100.00",
        user_id: 1,
        room_id: 1,
        checkin: "2024-09-30T17:00:00.000Z",
        checkout: "2024-10-04T17:00:00.000Z",
        userName: "User A",
      },
      {
        id: 3,
        hotel_id: null,
        name: "Room 101",
        area: 30,
        floor: 1,
        type: "Single",
        status: "Available",
        price: "100.00",
        user_id: 1,
        room_id: 1,
        checkin: "2024-09-30T17:00:00.000Z",
        checkout: "2024-10-04T17:00:00.000Z",
        userName: "User A",
      },
    ];

    db.query.mockImplementation((sql, params, callback) => {
      callback(null, mockData);
    });

    const response = await request(app).get("/bookings/1?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test("should return 500 if there is a database error", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(new Error("Database error"));
    });

    const response = await request(app).get("/bookings/1");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Lỗi truy vấn dữ liệu");
  });

  test("should return an empty array if no bookings found", async () => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(null, []);
    });

    const response = await request(app).get("/bookings/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
