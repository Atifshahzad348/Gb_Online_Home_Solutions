

// test code  this code is working properly 
const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    name: String, 
    contact: String,
    city: String,
    address: String,
    service: String,
    service_type: String,
    problem: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    servicePrice: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;


