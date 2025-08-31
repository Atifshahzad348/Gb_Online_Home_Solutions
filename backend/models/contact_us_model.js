const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: String, 
    email: String,
    text: String
    
})
const Contact = new mongoose.model("Contact", ContactSchema);

module.exports =  Contact;