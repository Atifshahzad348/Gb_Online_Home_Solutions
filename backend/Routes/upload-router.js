const express = require('express');
const router = express.Router();
const upload = require("../Middleware/simple-upload");

// Test upload route
router.post("/upload", upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: "No file uploaded" });
        }
        
        res.status(200).json({
            success: true,
            msg: "File uploaded successfully",
            imageUrl: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ success: false, msg: "Server error during upload" });
    }
});

module.exports = router;