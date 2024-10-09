const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig24");
const uploadController = require("../controllers/uploadController24");

// Route để upload file
router.post("/upload", upload.single("file"), uploadController.uploadFile);

// Route để truy xuất file đã upload
router.get("/upload/:fileName", uploadController.getFile);

module.exports = router;
