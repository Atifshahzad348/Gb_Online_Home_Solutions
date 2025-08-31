
// test code
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const professionalSchema = new mongoose.Schema({
    name: String,
    cnic: String,
    contact1: String,
    contact2: String,
    profession: String,
    specialization: String,
    experience: String,
    address: String,
    city: String,
    permenentAdress: String, // match field name
    password: String,
});

// JWT token method
professionalSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            cnic: this.cnic,
        }, process.env.jwtSecretKey, { expiresIn: "30d" });
    } catch (error) {
        console.error(error);
    }
};

// Password comparison method
professionalSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Pre-save hook for password hashing - FIXED VERSION
professionalSchema.pre("save", async function (next) {
    // Only hash the password if it's modified AND not empty
    if (this.isModified('password') && this.password) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            return next(error); // Pass any hashing error to mongoose
        }
    }
    next();
});

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;