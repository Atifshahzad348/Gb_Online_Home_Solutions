// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         default: ''
//     },
//     category: {
//         type: String,
//         required: true,
//         enum: ['cleaning', 'repair', 'installation', 'maintenance', 'other']
//     },
//     basePrice: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     duration: {
//         type: String,
//         default: '1-2 hours'
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     features: [{
//         type: String
//     }],
//     popularity: {
//         type: Number,
//         default: 0
//     }
// }, {
//     timestamps: true
// });

// const Service = mongoose.model('Service', serviceSchema);
// module.exports = Service;



const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
        enum: ['kitchen', 'paint', 'electrical', 'plumbing', 'recommended'],
        default: 'recommended'
    },
    subcategory: {
        type: String,
        default: ''
    },
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    duration: {
        type: String,
        default: '1-2 hours'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    features: [{
        type: String
    }],
    popularity: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;