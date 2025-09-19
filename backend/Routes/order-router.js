const express = require('express');
const router = express.Router();
const {orderForm, cancelOrder,deleteOrder} = require("../controllers/order-controller");
const authMiddleware = require("../Middleware/auth-middleware"); // Import auth middleware


// Add authMiddleware to protect this route and get user ID
router.route("/clientorder").post(authMiddleware, orderForm);


// ADD CANCELLATION ROUTE
router.route("/cancel/:orderId").patch(authMiddleware, cancelOrder);

// ADD DELETE ROUTE
router.route("/delete/:orderId").delete(authMiddleware, deleteOrder);

module.exports = router;

