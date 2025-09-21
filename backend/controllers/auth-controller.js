
// // test code

const User = require("../models/user-model");
const Professional = require("../models/professional-model");
const bcrypt = require('bcrypt');
const ContactSchema = require("../models/contact_us_model");
const Order = require("../models/book-order-model");
// const fs = require('fs');
// const path = require('path');


// Home logic
const home = async (req, res) => {
    try {
        res.send("home page is ready now!");
    } catch (error) {
        console.log(error);
    }
};

// Register logic
const register = async(req, res) => {
    try {
        const {name, email, contact, password} = req.body;
        const userExist = await User.findOne({email});
        
        if(userExist){
            return res.status(400).json({success: false, msg: "user already exist"});
        }
       
        // hashing the password using bcrypt 
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated = await User.create({
            name, 
            email, 
            contact, 
            password: hash_password,
            isOnline: true, // SET USER ONLINE ON REGISTRATION
            lastActive: new Date()
        });
        
        res.status(201).json({
            msg: "registration successful",  
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString()
        });
    } catch (error) {
        res.status(500).json("your reach the backend but herer is a error");
    }
};

// Login logic - UPDATED TO SET ONLINE STATUS
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});
        
        if(!userExist){
            return res.status(400).json({msg: "invalid credential"});
        }
        
        const pass = await bcrypt.compare(password, userExist.password);
        
        if(pass){
            // UPDATE USER ONLINE STATUS
            await User.findByIdAndUpdate(userExist._id, {
                isOnline: true,
                lastActive: new Date()
            });
            
            res.status(200).json({
                msg: "Login successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString()
            });
        } else {
            res.status(401).json({msg: "invalid credential"});
        }
    } catch (error) {
        res.status(500).json("internal server error");
    }
};

// Add logout function
const logout = async (req, res) => {
    try {
        // UPDATE USER OFFLINE STATUS
        await User.findByIdAndUpdate(req.userID, {
            isOnline: false,
            lastActive: new Date()
        });
        
        res.status(200).json({msg: "Logout successful"});
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({msg: "Server error during logout"});
    }
};

// User data logic
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log(`error form the user rote ${error}`);
    }
};

// Professional registration


// _______________________________________test code
// const professionalRegister = async (req, res) => {
//   console.log("=== PROFESSIONAL REGISTER START ===");
  
//   try {
//     console.log("Request body:", req.body);
//     console.log("Request files:", req.files);

//     // Check if we have form data - Multer should put text fields in req.body
//     if (!req.body || Object.keys(req.body).length === 0) {
//       console.log("No form data received");
//       return res.status(400).json({ 
//         success: false, 
//         error: "No form data received. Please check your form submission." 
//       });
//     }

//     // Extract fields from req.body
//     const { 
//       name, 
//       cnic, 
//       contact1, 
//       contact2, 
//       profession, 
//       specialization, 
//       experience, 
//       address, 
//       city, 
//       permenentAdress, 
//       password 
//     } = req.body;

//     console.log("Extracted fields:", { name, cnic, contact1 });

//     // Validate required fields
//     if (!name || !cnic || !contact1 || !password) {
//       console.log("Missing required fields");
//       return res.status(400).json({ 
//         success: false,
//         error: "Missing required fields: name, cnic, contact1, and password are required" 
//       });
//     }

//     console.log("All required fields present");

//     // Check if professional already exists
//     const userExist = await Professional.findOne({ cnic });
//     if (userExist) {
//       console.log("Professional already exists with CNIC:", cnic);
//       return res.status(400).json({ 
//         success: false,
//         error: "Professional already exists with this CNIC number" 
//       });
//     }

//     console.log("No existing professional found");

//     // Handle file uploads
//     let profileImage = '';
//     let cnicFrontImage = '';
//     let cnicBackImage = '';

//     if (req.files) {
//       console.log("Files received:", Object.keys(req.files));
      
//       if (req.files.profileImage) {
//         profileImage = req.files.profileImage[0].filename;
//         console.log("Profile image:", profileImage);
//       }
//       if (req.files.cnicFrontImage) {
//         cnicFrontImage = req.files.cnicFrontImage[0].filename;
//         console.log("CNIC front image:", cnicFrontImage);
//       }
//       if (req.files.cnicBackImage) {
//         cnicBackImage = req.files.cnicBackImage[0].filename;
//         console.log("CNIC back image:", cnicBackImage);
//       }
//     } else {
//       console.log("No files received");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new professional
//     const professional = new Professional({
//       name,
//       cnic,
//       contact1,
//       contact2: contact2 || '',
//       profession: profession || '',
//       specialization: specialization || '',
//       experience: experience || '',
//       address: address || '',
//       city: city || '',
//       permenentAdress: permenentAdress || '',
//       password: hashedPassword,
//       profileImage,
//       cnicFrontImage,
//       cnicBackImage
//     });

//     console.log("Professional object created, attempting to save...");

//     // Save to database
//     await professional.save();
//     console.log("Professional saved successfully");

//     res.status(201).json({
//       success: true,
//       message: "Professional registered successfully",
//       userId: professional._id.toString()
//     });

//   } catch (error) {
//     console.error("ERROR in professionalRegister:", error);
    
//     // Clean up uploaded files if there was an error
//     if (req.files) {
//       const fs = require('fs');
//       const path = require('path');
      
//       Object.values(req.files).forEach(fileArray => {
//         fileArray.forEach(file => {
//           const filePath = path.join(__dirname, '../uploads/professionals/', file.filename);
//           if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//           }
//         });
//       });
//     }
    
//     res.status(500).json({ 
//       success: false,
//       error: "Internal server error during registration",
//       message: process.env.NODE_ENV === 'development' ? error.message : "Please try again later"
//     });
//   }
// };
// test code_________________________________________

// test code................>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const professionalRegister = async (req, res) => {
  console.log("=== PROFESSIONAL REGISTER START ===");
  
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Check if we have form data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "No form data received. Please check your form submission." 
      });
    }

    // Extract fields from req.body
    const { 
      name, 
      cnic, 
      contact1, 
      contact2, 
      profession, 
      specialization, 
      experience, 
      address, 
      city, 
      permenentAdress, 
      password 
    } = req.body;

    // Validate required fields
    if (!name || !cnic || !contact1 || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Missing required fields: name, cnic, contact1, and password are required" 
      });
    }

    // Validate CNIC format
    if (!/^[0-9]{13}$/.test(cnic)) {
      return res.status(400).json({ 
        success: false,
        error: "CNIC must be exactly 13 digits" 
      });
    }

    // Validate contact format
    if (!/^[0-9]{11}$/.test(contact1)) {
      return res.status(400).json({ 
        success: false,
        error: "Contact number must be exactly 11 digits" 
      });
    }

    // Check if professional already exists
    const userExist = await Professional.findOne({ cnic });
    if (userExist) {
      return res.status(400).json({ 
        success: false,
        error: "Professional already exists with this CNIC number" 
      });
    }

    // Handle file uploads
    let profileImage = '';
    let cnicFrontImage = '';
    let cnicBackImage = '';

    if (req.files) {
      if (req.files.profileImage) {
        profileImage = req.files.profileImage[0].filename;
      }
      if (req.files.cnicFrontImage) {
        cnicFrontImage = req.files.cnicFrontImage[0].filename;
      }
      if (req.files.cnicBackImage) {
        cnicBackImage = req.files.cnicBackImage[0].filename;
      }
    }

    // Create new professional - PASS PLAIN TEXT PASSWORD
    // The pre-save hook will handle hashing automatically
    const professional = new Professional({
      name: name.trim(),
      cnic: cnic.trim(),
      contact1: contact1.trim(),
      contact2: (contact2 || '').trim(),
      profession: (profession || '').trim(),
      specialization: (specialization || '').trim(),
      experience: (experience || '').trim(),
      address: (address || '').trim(),
      city: (city || '').trim(),
      permenentAdress: (permenentAdress || '').trim(),
      password: password, // Plain text - will be hashed by pre-save hook
      profileImage,
      cnicFrontImage,
      cnicBackImage
    });

    // Save to database - pre-save hook will hash the password
    await professional.save();
    console.log("Professional saved successfully with ID:", professional._id);

    // Generate token for immediate login
    const token = await professional.generateToken();

    res.status(201).json({
      success: true,
      message: "Professional registered successfully",
      token: token,
      userId: professional._id.toString(),
      user: {
        name: professional.name,
        cnic: professional.cnic,
        profession: professional.profession
      }
    });

  } catch (error) {
    console.error("ERROR in professionalRegister:", error);
    
    // Handle duplicate key error (unique CNIC)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.cnic) {
      return res.status(400).json({ 
        success: false,
        error: "Professional already exists with this CNIC number" 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        error: "Validation failed",
        details: errors 
      });
    }
    
    // Clean up uploaded files if there was an error
    if (req.files) {
      const fs = require('fs');
      const path = require('path');
      
      Object.values(req.files).forEach(fileArray => {
        fileArray.forEach(file => {
          const filePath = path.join(__dirname, '../uploads/professionals/', file.filename);
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch (unlinkError) {
              console.error("Error deleting file:", unlinkError);
            }
          }
        });
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: "Internal server error during registration",
      message: process.env.NODE_ENV === 'development' ? error.message : "Please try again later"
    });
  }
};
// test code...........................................?>>>>>>>>>>>>>>











// Professional login
const professionallogin = async (req, res) => {
    try {
        console.log("Login attempt with CNIC:", req.body.cnic);
        const { cnic, password } = req.body;
        const professionalExist = await Professional.findOne({ cnic });
        
        console.log("Found professional:", professionalExist);
        
        if (!professionalExist) {
            console.log("No professional found with this CNIC");
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isPasswordMatch = await professionalExist.comparePassword(password);
        console.log("Password match result:", isPasswordMatch);
        
        // if (isPasswordMatch) {
        //     res.status(200).json({ 
        //         msg: "Login successful", 
        //         token: await professionalExist.generateToken(), 
        //         userId: professionalExist._id.toString() 
        //     });
        // } 
        if (isPasswordMatch) {
    const token = await professionalExist.generateToken();
    
    res.status(200).json({ 
        success: true,
        msg: "Login successful", 
        token: token, 
        userId: professionalExist._id.toString(),
        user: { // Make sure this user object is included
            name: professionalExist.name,
            cnic: professionalExist.cnic,
            profession: professionalExist.profession,
            userId: professionalExist._id.toString()
        }
    });
} else {
            console.log("Password doesn't match");
            res.status(401).json({ msg: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// Professionals data
const professionals = async (req, res) => {
    try {
        const professionalData = req.professionals;
        console.log(professionalData);
        return res.status(200).json({professionalData});
    } catch (error) {
        console.log(`error form the user rote ${error}`);
    }
};

// Get user profile orders
const getUserProfileOrder = async (req, res) => {
    try {
        console.log("Fetching orders for user ID:", req.userID);
        const orders = await Order.find({ user: req.userID }).sort({ createdAt: -1 });
       
        if(!orders || orders.length === 0){
            return res.status(404).json({msg: "No orders found for this user"});
        }
        
        console.log("Orders found:", orders.length);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({msg: "Server error while fetching orders"});
    }
};

// Add status check endpoint
const checkStatus = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userID, {
            lastActive: new Date()
        });
        
        res.status(200).json({msg: "Status updated"});
    } catch (error) {
        console.error("Status check error:", error);
        res.status(500).json({msg: "Server error updating status"});
    }
};

module.exports = {
    home, 
    register, 
    login, 
    logout, // ADD LOGOUT EXPORT
    user, 
    professionalRegister, 
    professionallogin, 
    professionals, 
    getUserProfileOrder,
    checkStatus // ADD STATUS CHECK EXPORT
};




