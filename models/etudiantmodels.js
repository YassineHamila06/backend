const mongoose = require("mongoose");
const usermodels = require("./usermodels")
const etudiantSchema = new mongoose.Schema({
cv: { type: String, required:true},
niveau : { type: String, required: true},
})
usermodels.discriminator("etudiant",etudiantSchema)
module.exports=mongoose.model("etudiant")