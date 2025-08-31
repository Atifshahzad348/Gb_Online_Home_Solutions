const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    name: String, 
    contact: String,
    city: String,
    address: String,
    service: String,
    service_type: String,
    problem: String,
    
})
const Order = new mongoose.model("orders", OrderSchema );

module.exports =  Order;