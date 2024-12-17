const mongoose = require("mongoose");
const usermodels = require("./usermodels")
const adminSchema = new mongoose.Schema({

})
usermodels.discriminator("admin",adminSchema)
module.exports=mongoose.model("admin")