const User = require("../models/user-model");
const Contact = require("../models/contact_us_model");
const CallRequest = require("../models/client_call_request")
const Order = require("../models/book-order-model")

// new code professionals 22/08/2025

const Professional = require ("../models/professional-model");




//_______________________________________________________________________________________________

                                    //<<Get all users >>            
//_______________________________________________________________________________________________



const getALlUsers= async(req, res, next)=>{
    try {
        const users = await User.find({}, {password:0});
        if(!users || users.length === 0){
            return res.status(404).json({msg: "no users found"});
        }
        res.status(200).json(users);
    } catch (error) {
        next(eror); 
    }
}

//_______________________________________________________________________________________________

                                    //<<Update User >>            
//_______________________________________________________________________________________________


const updateUserByID = async(req, res)=>{
    try {
        const id= req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({_id:id}, {$set:updatedUserData})
        return  res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}


//_______________________________________________________________________________________________

                                    //<<Get all Contacts >>            
//_______________________________________________________________________________________________

const getAllContacts = async(req, res, next)=>{
    try {
        const contacts = await Contact.find();
       
        if(!contacts || contacts.length === 0){
            return res.status(404).json({msg: "no contacts found"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }

}




//_______________________________________________________________________________________________

                                    //<<Get all Contacts >>            
//_______________________________________________________________________________________________

const getAllCallRequest = async(req, res, next)=>{
    try {
        const calls = await CallRequest.find();
        if(!calls || calls.length === 0){
            return res.status(404).json({msg: "no call request found"});
        }
        res.status(200).json(calls);
    } catch (error) {
         next(error);
    }
}


//_______________________________________________________________________________________________

                                    //<<Get all Clients Orders>>            
//_______________________________________________________________________________________________


    
const getAllClientOrders = async (req, res, next)=>{
     try {
        const orders = await Order.find();
        if(!orders || orders.length === 0){
            return res.status(404).json({msg: "no orders yet"});
        }
        res.status(200).json(orders);
    } catch (error) {
         next(error);
    }
}


//_______________________________________________________________________________________________

                                    //<<Deleting users  >>            
//_______________________________________________________________________________________________
const deleteUserById = async(req, res) =>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({msg: "user delete successfully"});
        
    } catch (error) {
        next(error);
    }
}

//_______________________________________________________________________________________________

                                    //<<Single User Data  >>            
//_______________________________________________________________________________________________

const getUserbyID = async(req, res) =>{
    try {
        const id = req.params.id;
        const data =  await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

//_______________________________________________________________________________________________

                                    //<<Deleting Client Messages  >>            
//_______________________________________________________________________________________________

const deleteMessageById = async(req, res)=>{

      try {
        const id = req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({msg: "Message deleted successfully"});
        
    } catch (error) {
        next(error);
    }
}

//_______________________________________________________________________________________________

                                    //<<Deleting Client call request  >>            
//_______________________________________________________________________________________________

const deleteCallRequesById = async(req, res)=>{

      try {
        const id = req.params.id;
        await CallRequest.deleteOne({_id:id});
        return res.status(200).json({msg: "call request is deleted successfully"});
        
    } catch (error) {
        next(error);
    }
}


const deleteOrderById = async(req, res)=>{
       try {
        const id = req.params.id;
        await Order.deleteOne({_id:id});
        return res.status(200).json({msg: "order is deleted successfully"});
        
    } catch (error) {
        next(error);
    }
}

// professionals code

const getALlProfessionals= async(req, res, next)=>{
    try {
        const professionals = await Professional.find({}, {password:0});
        if(!professionals || professionals.length === 0){
            return res.status(404).json({msg: "no professional found"});
        }
        res.status(200).json(professionals);
    } catch (error) {
        next(eror); 
    }
}




// professionals code


const deleteProfessionalsById = async(req, res)=>{
       try {
        const id = req.params.id;
        await Professional.deleteOne({_id:id});
        return res.status(200).json({msg: "Professional's account is deleted successfully"});
        
    } catch (error) {
        next(error);
    }
}



module.exports =  { getALlUsers, getAllContacts, getAllCallRequest, getAllClientOrders, deleteUserById, deleteMessageById, deleteCallRequesById,deleteOrderById, getUserbyID, updateUserByID, getALlProfessionals, deleteProfessionalsById  };