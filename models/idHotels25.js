const db = require("../config/db21");

const findById = async (id) => {
  try {
    // Kiểm tra xem id có phải là số nguyên hay không
    const hotelId = parseInt(id);
    if (isNaN(hotelId)) {
      throw new Error("Invalid ID format");
    }

    const [rows] = await db.execute("SELECT * FROM hotels WHERE id = ?", [
      hotelId,
    ]);
    // Trả về hotel đầu tiên tìm thấy hoặc null nếu không tìm thấy
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Error fetching hotel:", error);
    throw error; // Ném lại lỗi để có thể xử lý ở nơi gọi hàm này
  }
};

module.exports = {
  Hotel: { findById },
};
