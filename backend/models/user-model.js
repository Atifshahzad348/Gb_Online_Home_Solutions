

// // // Test code ____________________________________________________________________

// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// const userSchema = mongoose.Schema({
//     name: String,
//     email: String, 
//     contact: String,
//     password: String,
//     is_admin: {
//         type: Boolean, 
//         default: false
//     },
//     isOnline: {
//         type: Boolean,
//         default: false
//     },
//     lastActive: {
//         type: Date,
//         default: Date.now
//     },
//     // ADD PROFILE FIELDS
//     profileImage: {
//         type: String,
//         default: ''
//     },
//     bio: {
//         type: String,
//         default: 'I love using this platform!'
//     },
//     address: {
//         type: String,
//         default: ''
//     },
//     // ADD ORDER TRACKING FIELD
//     orders: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Order'
//     }],
//     // ADD ORDER COUNT FOR QUICK REFERENCE
//     orderCount: {
//         type: Number,
//         default: 0
//     },
//     // ADD TOTAL SPENT FOR ANALYTICS
//     totalSpent: {
//         type: Number,
//         default: 0
//     }
// }, {
//     timestamps: true // This will add createdAt and updatedAt fields
// });






// // // Test code ____________________________________________________________________

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: String,
    email: String, 
    contact: String,  // This is what stores the phone number
    password: String,
    is_admin: {
        type: Boolean, 
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    // PROFILE FIELDS
    profileImage: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: 'I love using this platform!'
    },
    address: {
        type: String,
        default: ''
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    orderCount: {
        type: Number,
        default: 0
    },
    totalSpent: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// jwt token and other methods remain the same
// ...
// jwt token 
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            is_admin: this.is_admin
        }, process.env.jwtSecretKey, {expiresIn: "30d"});
    } catch (error) {
        console.error(error);
    }
};

userSchema.methods.comparePass = async function(){}

userSchema.pre("save", async function(){
    console.log("pre method", this);
});

const User = mongoose.model("User", userSchema);
module.exports = User;