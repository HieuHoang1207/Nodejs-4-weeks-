const hotelService = require("../services/hotelService25");

const getHotel = async (req, res) => {
  const hotelId = req.params.id;
  console.log("Fetching hotel with ID:", hotelId); // Log thêm thông tin ID

  try {
    const hotel = await hotelService.getHotelById(hotelId);
    console.log("Hotel data:", hotel); // Log dữ liệu hotel nhận được
    res.json(hotel);
  } catch (err) {
    console.error("Error in getHotel:", err); // Log lỗi nếu có
    res.status(500).json({ error: "Error fetching hotel" });
  }
};

module.exports = {
  getHotel,
};
