const mongoose = require('mongoose');

const CallRequestSchema = mongoose.Schema({
    name: String,
    contact: String,
    service: String,
    city: String,
    area:String,
    address: String,
   


})



const CallRequest = mongoose.model("CallRequest", CallRequestSchema);

module.exports = CallRequest;