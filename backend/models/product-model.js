const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['plumbing', 'electrical', 'paint', 'kitchen', 'tools', 'safety']
    },
    subcategory: {
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    sku: {
        type: String,
        unique: true
    },
    features: [{
        type: String
    }],
    specifications: {
        type: Map,
        of: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// Generate SKU before saving
productSchema.pre('save', function(next) {
    if (!this.sku) {
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.sku = `PROD-${random}-${Date.now().toString(36)}`;
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;