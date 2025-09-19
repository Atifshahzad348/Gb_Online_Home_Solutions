const express = require('express');
const router = express.Router();
const productController = require("../controllers/product-controller");
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-milddleware");
const productUpload = require("../Middleware/product-upload");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// Protected admin routes
router.post("/", authMiddleware, adminMiddleware, productUpload.array('images', 5), productController.createProduct);
router.put("/:id", authMiddleware, adminMiddleware, productUpload.array('images', 5), productController.updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;