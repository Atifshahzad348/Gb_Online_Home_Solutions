const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    // STORE THESE DETAILS DIRECTLY IN THE ORDER
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    sku: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'cod'],
    default: 'cod'
  },
  shippingAddress: {
    name: String,
    contact: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  transactionId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);