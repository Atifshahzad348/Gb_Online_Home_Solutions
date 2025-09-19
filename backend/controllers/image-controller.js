

const Image = require("../models/img-model");

const uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { path, filename } = req.file;
    const image = new Image({ path, filename });
    await image.save();

    res.status(201).json({ 
      success: true,
      message: "Image uploaded successfully",
      file: {
        path: path,
        filename: filename
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      error: "Upload failed",
      details: error.message 
    });
  }
};

module.exports = uploadImg;