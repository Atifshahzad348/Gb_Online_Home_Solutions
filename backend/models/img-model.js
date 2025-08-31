const mongoose = require('mongoose');

const imgSchema = mongoose.Schema({
    path: {type: String, required: true}, 
    filename: {type: String, required: true},

    
})
const Image = new mongoose.model("image", imgSchema);

module.exports =  Image;