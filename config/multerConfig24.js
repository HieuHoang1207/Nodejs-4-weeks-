const multer = require("multer");
const path = require("path");

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const newFilename = `${timestamp}__${originalName}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

module.exports = upload;
