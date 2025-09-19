const User = require("../models/user-model");

const updateUserActivity = async (req, res, next) => {
    try {
        if (req.userID) {
            // Update last active timestamp
            await User.findByIdAndUpdate(req.userID, {
                lastActive: new Date()
            });
        }
        next();
    } catch (error) {
        console.error("Activity update error:", error);
        next();
    }
};

// Middleware to check and update online status periodically
const checkOnlineStatus = async () => {
    try {
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
        
        // Find users who were active recently but might not have properly logged out
        const recentlyActiveUsers = await User.find({
            isOnline: true,
            lastActive: { $lt: fifteenMinutesAgo }
        });
        
        // Update their status to offline
        for (const user of recentlyActiveUsers) {
            await User.findByIdAndUpdate(user._id, {
                isOnline: false
            });
            console.log(`User ${user.email} marked as offline due to inactivity`);
        }
    } catch (error) {
        console.error("Online status check error:", error);
    }
};

// Run status check every 5 minutes
setInterval(checkOnlineStatus, 5 * 60 * 1000);

module.exports = { updateUserActivity, checkOnlineStatus };