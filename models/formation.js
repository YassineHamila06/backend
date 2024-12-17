const mongoose = require("mongoose");
const usermodels = require("./usermodels")
const formationSchema = new mongoose.Schema({
nom: { type: String, required:true},
description : { type: String, required: true},
date_de_debut : { type: String, required: true},
date_de_fin : { type: String, required: true},
deadline_inscription : { type: String, required:true},
cours:[{type: mongoose.Types.ObjectId,ref:"cours"}],
etudiant:[{type: mongoose.Types.ObjectId,ref:"etudiant"}],
formateur:[{type: mongoose.Types.ObjectId,ref:"formateur"}]
})
module.exports=mongoose.model("formation",formationSchema)