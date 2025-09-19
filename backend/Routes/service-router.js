// const express = require('express');
// const router = express.Router();
// const serviceController = require("../controllers/service-controller");
// const authMiddleware = require("../Middleware/auth-middleware");
// const adminMiddleware = require("../Middleware/admin-milddleware");
// const upload = require("../Middleware/simple-upload");

// // Get all services (public route)
// router.get("/", serviceController.getAllServices);

// // Get single service (public route)
// router.get("/:id", serviceController.getServiceById);

// // Protected admin routes
// router.post("/", authMiddleware, adminMiddleware, upload.single('image'), serviceController.createService);
// router.put("/:id", authMiddleware, adminMiddleware, upload.single('image'), serviceController.updateService);
// router.delete("/:id", authMiddleware, adminMiddleware, serviceController.deleteService);

// module.exports = router;



const express = require('express');
const router = express.Router();
const serviceController = require("../controllers/service-controller");
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-milddleware");
const serviceUpload = require("../Middleware/service-upload"); // ✅ Use service-specific upload

// Get all services (public route)
router.get("/", serviceController.getAllServices);

// Get single service (public route)
router.get("/:id", serviceController.getServiceById);

// Protected admin routes
router.post("/", authMiddleware, adminMiddleware, serviceUpload.single('image'), serviceController.createService);
router.put("/:id", authMiddleware, adminMiddleware, serviceUpload.single('image'), serviceController.updateService);
router.delete("/:id", authMiddleware, adminMiddleware, serviceController.deleteService);
// Get services by category
router.get("/category/:category", serviceController.getServicesByCategory);
module.exports = router;