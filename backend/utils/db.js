const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/finalYearproject";

// const URI = process.env.MONGODB_URI;


const connectDb = async ()=>{
    try {
        mongoose.connect(URI);
        console.log("Database connection successfuly.");
    } catch (error) {
        console.log("Database connection failed!");
        process.exit(0);
    }
}
module.exports = connectDb;