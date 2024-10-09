const path = require("path");
const fs = require("fs");

// Controller để upload file
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = `/uploads/${req.file.filename}`;
  res.json({
    message: "File uploaded successfully",
    filePath: filePath,
  });
};

// Controller để lấy file đã upload
exports.getFile = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../public/uploads", fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found.");
    }

    res.sendFile(filePath);
  });
};
