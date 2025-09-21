// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure upload directory exists
// const ensureUploadsDir = (dirPath) => {
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//     console.log(`Created upload directory: ${dirPath}`);
//   }
// };

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, '../uploads/professionals');
//     ensureUploadsDir(uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter for images only
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

// // Configure multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Middleware for handling multiple files
// const uploadProfessionalFiles = upload.fields([
//   { name: 'profileImage', maxCount: 1 },
//   { name: 'cnicFrontImage', maxCount: 1 },
//   { name: 'cnicBackImage', maxCount: 1 }
// ]);

// module.exports = uploadProfessionalFiles;





// test code>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const ensureUploadsDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created upload directory: ${dirPath}`);
    }
};

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads/professionals');
        ensureUploadsDir(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Keep original file extension
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
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

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Middleware for handling multiple files
const uploadProfessionalFiles = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'cnicFrontImage', maxCount: 1 },
    { name: 'cnicBackImage', maxCount: 1 }
]);

module.exports = uploadProfessionalFiles;