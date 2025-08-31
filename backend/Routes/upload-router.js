// const express = require('express');
// const router = express.Router();
// const imageupload = require("../controllers/image-controller");

// router.route("/single", ).post(imageupload);

// module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../Middleware/img-middleware"); // Import Multer middleware
const imageupload = require("../controllers/image-controller");

// Apply Multer middleware to the route
router.route("/single").post(upload.single("image"), imageupload); // Fixed route structure

module.exports = router;