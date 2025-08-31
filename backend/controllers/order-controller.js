const Order = require("../models/book-order-model");

const orderForm = async (req, res) =>{
 try {
    const response = req.body;
    await Order.create(response);
    return res.status(200).json({msg: "book order successfully"});
 } catch (error) {
    res.status(500).json({msg: "Not book yet"});

 }
}

module.exports = orderForm;