const express = require('express');
const router = express.Router();
const userController = require("../controllers/user-controller"); // Fixed path
const authMiddleware = require("../Middleware/auth-middleware");
const upload = require("../Middleware/simple-upload"); // Use simple-upload

// Get user profile
router.get("/profile", authMiddleware, userController.getUserProfile);

// Update user profile - use simple upload middleware
router.put("/profile", 
    authMiddleware, 
    upload.single('profileImage'),  // This matches the field name from frontend
    userController.updateUserProfile
);

module.exports = router;