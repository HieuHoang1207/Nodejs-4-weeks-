const db = require("../models/idHotels25");
const redisClient = require("../config/redis25");

const HOTEL_CACHE_KEY_PREFIX = "hotel_";

const getHotelById = async (hotelId) => {
  const cacheKey = `${HOTEL_CACHE_KEY_PREFIX}${hotelId}`;

  // Kiểm tra xem thông tin hotel có trong cache không
  return new Promise(async (resolve, reject) => {
    try {
      // Sử dụng Promise với redisClient.get
      const data = await redisClient.get(cacheKey);
      if (data) {
        console.log("Fetching hotel from cache");
        return resolve(JSON.parse(data)); // Trả về data từ cache
      }

      // Nếu không có trong cache, lấy từ database
      const hotel = await db.Hotel.findById(hotelId);

      // Lưu lại trong cache với thời gian hết hạn là 1 giờ (3600 giây)
      await redisClient.setEx(cacheKey, 3600, JSON.stringify(hotel));

      console.log("Fetching hotel from database");
      resolve(hotel);
    } catch (err) {
      console.error("Error fetching hotel data:", err);
      reject(err);
    }
  });
};

module.exports = {
  getHotelById,
};
