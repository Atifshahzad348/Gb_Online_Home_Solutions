const {Schema, model} = require("mongoose");

const serviceSchema = new Schema({
    service:{type: String, required:true},
    description:{type: String, required:true},
  
})

const Service = new model("service", serviceSchema);

module.exports = Service;