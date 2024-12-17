const mongoose = require("mongoose");
const usermodels = require("./usermodels")
const formateurSchema = new mongoose.Schema({
specialite: { type: String, required:true},
diplome : { type: String, required: true},
description : { type: String, required: true},
formation:{type: mongoose.Types.ObjectId,ref:"formation"},
cours:[{type: mongoose.Types.ObjectId,ref:"cours"}]
})
usermodels.discriminator("formateur",formateurSchema)
module.exports=mongoose.model("formateur")