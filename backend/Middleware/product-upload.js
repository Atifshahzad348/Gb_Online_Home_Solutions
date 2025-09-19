const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Ensure products upload directory exists
const productsUploadDir = './uploads/products';
if (!fs.existsSync(productsUploadDir)) {
    fs.mkdirSync(productsUploadDir, { recursive: true });
}

// Configure multer for product images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productsUploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 10 * 1024 * 1024, // 10MB limit per file
        files: 5 // Maximum 5 files
    }
});

module.exports = upload;