const User = require("../models/user-model");
const Professional = require("../models/professional-model");
const bcrypt = require('bcrypt');
const ContactSchema = require("../models/contact_us_model");


// ____________________

// Home  logic >>>

// ____________________

const home = async (req, res)=>{
    try {
        res.send("home page is ready now!")
    } catch (error) {
        console.log(error);
    }

}


// ____________________

// Register  us logic >>>

// ____________________

const register = async(req, res)=>{
    try {
        const {name, email, contact, password} = req.body;

        const userExist = await User.findOne({email});
        

        if(userExist){
            return res.status(400).json({success: false, msg: "user already exist"});
          
            
        }
       
        // hashing the password using bcrypt 
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated =  await User.create({name, email, contact, password: hash_password});
        res.status(201).json({msg: "registration successful",  token: await userCreated.generateToken(), userId: userCreated._id.toString()});
    } catch (error) {
        res.status(500).json("your reach the backend but herer is a error");
    }
}



// ____________________

// Login  logic >>>

// ____________________


const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({msg: "invaid credential"});
           

        }
        const pass = await bcrypt.compare(password, userExist.password);
        
        if(pass){
             res.status(200).json({msg: "Login successful", token: await userExist.generateToken(), userId: userExist._id.toString()});
        }else{
            res.status(401).json({msg: "invalid credential"});
    
        }
    } catch (error) {
        res.status(500).json("internal server error");
    }
}





// ____________________

// user data logic (to send user data) >>>

// ____________________

const user = async (req, res) =>{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
       console.log(`error form the user rote ${error}`)
    }
}


// ____________________



// test code
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
// ____________________

//  professional Login  logic >>>

// ____________________




const professionallogin = async (req, res) => {
    try {
        console.log("Login attempt with CNIC:", req.body.cnic); // DEBUG
        
        const { cnic, password } = req.body;
        const professionalExist = await Professional.findOne({ cnic });
        
        console.log("Found professional:", professionalExist); // DEBUG
        
        if (!professionalExist) {
            console.log("No professional found with this CNIC"); // DEBUG
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isPasswordMatch = await professionalExist.comparePassword(password);
        console.log("Password match result:", isPasswordMatch); // DEBUG
        
        if (isPasswordMatch) {
            res.status(200).json({ 
                msg: "Login successful", 
                token: await professionalExist.generateToken(), 
                userId: professionalExist._id.toString() 
            });
        } else {
            console.log("Password doesn't match"); // DEBUG
            res.status(401).json({ msg: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}


// ____________________

// user data logic (to send user data) >>>

// ____________________

const professionals = async (req, res) =>{
    try {
        const professionalData = req.professionals;
        console.log(professionalData);
        return res.status(200).json({professionalData});
    } catch (error) {
       console.log(`error form the user rote ${error}`)
    }
}





module.exports = {home, register, login, user, professionalRegister, professionallogin, professionals};