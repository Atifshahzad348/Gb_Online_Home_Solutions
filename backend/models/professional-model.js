

// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const professionalSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Name is required'],
//         trim: true
//     },
//     cnic: {
//         type: String,
//         required: [true, 'CNIC is required'],
//         unique: true,
//         validate: {
//             validator: function(v) {
//                 return /^[0-9]{13}$/.test(v);
//             },
//             message: 'CNIC must be 13 digits'
//         }
//     },
//     contact1: {
//         type: String,
//         required: [true, 'Contact number is required'],
//         validate: {
//             validator: function(v) {
//                 return /^[0-9]{11}$/.test(v);
//             },
//             message: 'Contact must be 11 digits'
//         }
//     },
//     contact2: {
//         type: String,
//         validate: {
//             validator: function(v) {
//                 return v === '' || /^[0-9]{11}$/.test(v);
//             },
//             message: 'Contact must be 11 digits'
//         }
//     },
//     profession: String,
//     specialization: String,
//     experience: String,
//     address: String,
//     city: String,
//     permenentAdress: String,
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [6, 'Password must be at least 6 characters']
//     },
//     profileImage: String,
//     cnicFrontImage: String,
//     cnicBackImage: String,
//     isVerified: {
//         type: Boolean,
//         default: false
//     }
// }, {
//     timestamps: true
// });

// // JWT token method
// professionalSchema.methods.generateToken = async function () {
//     try {
//         return jwt.sign({
//             userId: this._id.toString(),
//             cnic: this.cnic,
//         }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
//     } catch (error) {
//         console.error("Token generation error:", error);
//         throw error;
//     }
// };

// // Password comparison method
// professionalSchema.methods.comparePassword = async function (password) {
//     try {
//         return await bcrypt.compare(password, this.password);
//     } catch (error) {
//         console.error("Password comparison error:", error);
//         throw error;
//     }
// };

// // Pre-save hook for password hashing
// professionalSchema.pre("save", async function (next) {
//     // Only hash the password if it's modified AND not empty
//     if (this.isModified('password') && this.password) {
//         try {
//             const saltRounds = 10;
//             this.password = await bcrypt.hash(this.password, saltRounds);
//         } catch (error) {
//             return next(error);
//         }
//     }
//     next();
// });

// const Professional = mongoose.model("Professional", professionalSchema);

// module.exports = Professional;


// test code ----------------------------------->>>>>>>
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const professionalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    cnic: {
        type: String,
        required: [true, 'CNIC is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{13}$/.test(v);
            },
            message: 'CNIC must be 13 digits'
        }
    },
    contact1: {
        type: String,
        required: [true, 'Contact number is required'],
        validate: {
            validator: function(v) {
                return /^[0-9]{11}$/.test(v);
            },
            message: 'Contact must be 11 digits'
        }
    },
    contact2: {
        type: String,
        validate: {
            validator: function(v) {
                return v === '' || /^[0-9]{11}$/.test(v);
            },
            message: 'Contact must be 11 digits'
        }
    },
    profession: String,
    specialization: String,
    experience: String,
    address: String,
    city: String,
    permenentAdress: String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    profileImage: String,
    cnicFrontImage: String,
    cnicBackImage: String,
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// JWT token method
professionalSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            cnic: this.cnic,
        }, process.env.jwtSecretkey, { expiresIn: "30d" });
    } catch (error) {
        console.error("Token generation error:", error);
        throw error;
    }
};

// Password comparison method
professionalSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Password comparison error:", error);
        throw error;
    }
};

// Pre-save hook for password hashing - SAFE VERSION
professionalSchema.pre("save", async function (next) {
    // Only hash the password if it's modified and not already hashed
    if (this.isModified('password') && this.password) {
        try {
            // Check if password is already hashed (bcrypt hashes start with $2b$)
            if (this.password.startsWith('$2b$')) {
                console.log("Password is already hashed, skipping re-hashing");
                return next();
            }
            
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        } catch (error) {
            console.error("Password hashing error:", error);
            return next(error);
        }
    }
    next();
});

const Professional = mongoose.model("Professional", professionalSchema);

module.exports = Professional;