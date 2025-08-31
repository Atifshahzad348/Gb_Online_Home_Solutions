const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: String,
    email: String, 
    contact: String,
    password: String,
    is_admin: {
        type: Boolean, 
        default: false
    }
})

// jwt token 
userSchema.methods.generateToken = async function(){
        try {
           
            return jwt.sign({
                userId: this._id.toString(),
                email: this.email,
                is_admin: this.is_admin
            }, process.env.jwtSecretKey, {expiresIn: "30d"})
        } catch (error) {
            console.error(error)
        }
};
userSchema.methods.comparePass = async function(){}


userSchema.pre("save", async function(){
    console.log("pre method", this);
})
const User = mongoose.model("User", userSchema);

module.exports = User;