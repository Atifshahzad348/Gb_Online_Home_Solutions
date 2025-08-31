// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//    cd(null, Date.now()+ "_"+ file.originalname);

//   }
// })
// const upload = multer({ storage: storage })
// router.post("/upload", upload.single("image"), uploadImg);
// module.exports = {storage, upload};

const multer = require("multer"); // Added multer import

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Fixed path (ensure "./uploads" exists)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname).single('image'); // Fixed typo (cd → cb)
  }
});

const upload = multer({ storage: storage });

module.exports = upload; // Export only upload (storage not needed separately)