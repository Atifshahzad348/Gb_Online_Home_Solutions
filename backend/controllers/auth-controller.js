
// test code

const User = require("../models/user-model");
const Professional = require("../models/professional-model");
const bcrypt = require('bcrypt');
const ContactSchema = require("../models/contact_us_model");
const Order = require("../models/book-order-model");

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
const professionalRegister = async (req, res) => {
    try {
        const { name, cnic, contact1, contact2, profession, specialization, experience, address, city, permenentAdress, password } = req.body;
        const userExist = await Professional.findOne({ cnic });

        if (userExist) {
            return res.status(400).json({ success: false, msg: "Professional already exists" });
        }

        const professional = new Professional({
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
        });

        await professional.save();
        const token = await professional.generateToken();

        res.status(201).json({
            msg: "Professional registration successful",
            token,
            userId: professional._id.toString()
        });

    } catch (error) {
        console.log("Error in professionalRegister:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
};

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
        
        if (isPasswordMatch) {
            res.status(200).json({ 
                msg: "Login successful", 
                token: await professionalExist.generateToken(), 
                userId: professionalExist._id.toString() 
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