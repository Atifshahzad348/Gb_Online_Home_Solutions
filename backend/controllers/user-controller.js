const User = require("../models/user-model");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userID).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ success: false, msg: "Server error while fetching profile" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userID;
        const { name, bio, phone, address } = req.body;
        
        console.log("Updating profile for user:", userId);
        console.log("Request body:", req.body);
        console.log("File:", req.file);
        
        let updateData = { 
            name, 
            bio, 
            address,
            contact: phone // Map phone to contact field
        };
        
        // Handle image upload if exists
        if (req.file) {
            try {
                // For local storage - use relative path
                updateData.profileImage = `/uploads/${req.file.filename}`;
                console.log("Image uploaded:", updateData.profileImage);
            } catch (uploadError) {
                console.error("Image upload error:", uploadError);
                return res.status(500).json({
                    success: false,
                    msg: "Error uploading image"
                });
            }
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
        
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            success: false,
            message: 'Server Error: ' + error.message
        });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
};