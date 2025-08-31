// multer middle ware for uploading imgs
// const Image = require("../models/img-model");


// const uploadImg = async(req, res)=>{
//   try {
//     const {path, filename } = req.file;
//     const image = await Image({path, filename})
//     await image.save();
//     res.send({msg:"img uploaded"});
//   } catch (error) {
//     res.send({"error":"Unable to upload img"});
//   }
// }

// module.exports = uploadImg;

// const Image = require("../models/img-model");

// const uploadImg = async (req, res) => {
//   try {
//     // Check if file exists in the request
//     if (!req.file) {
//       return res.status(400).send({ error: "No file uploaded" });
//     }

//     const { path, filename } = req.file;
    
//     // Create and save the image
//     const image = new Image({ path, filename });
//     await image.save();
    
//     res.status(201).send({ msg: "Image uploaded successfully", image });
//   } catch (error) {
//     console.error("Upload error:", error); // Log the error for debugging
//     res.status(500).send({ error: "Unable to upload image", details: error.message });
//   }
// }

// module.exports = uploadImg;
// The end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const Image = require("../models/img-model");

const uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { path, filename } = req.file;
    const image = new Image({ path, filename });
    await image.save();

    res.status(201).json({ 
      success: true,
      message: "Image uploaded successfully",
      file: {
        path: path,
        filename: filename
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ 
      error: "Upload failed",
      details: error.message 
    });
  }
};

module.exports = uploadImg;