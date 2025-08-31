//call requestform logic

const callRequest = require("../models/client_call_request");

const callForm = async (req, res) =>{
 try {
    const response = req.body;
    await callRequest.create(response);
    return res.status(200).json({msg: "message sent successfully"});
 } catch (error) {
    res.status(500).json({msg: "message not delivered"});

 }
}



module.exports = callForm;