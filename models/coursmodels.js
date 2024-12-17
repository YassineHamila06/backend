const mongoose = require("mongoose");
const coursSchema = new mongoose.Schema({
title: { type: String, required:true},
nombre_de_cours : { type: Number},
description : { type: String, required: true},
image : { type: String,},
formation:{type: mongoose.Types.ObjectId,ref:"formation"},
formateur:{type: mongoose.Types.ObjectId,ref:"formateur"}
})
module.exports=mongoose.model("cours",coursSchema)