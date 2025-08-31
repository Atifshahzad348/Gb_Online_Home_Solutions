// ____________________

// contact us logic >>>

// ____________________

const Contact = require("../models/contact_us_model");

const contactForm = async (req, res) =>{
 try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({msg: "message sent successfully"});
 } catch (error) {
    res.status(500).json({msg: "message not delivered"});

 }
}

module.exports = contactForm;