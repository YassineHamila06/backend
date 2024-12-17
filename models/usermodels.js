//const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const baseOption = {discriminatorkey:"itemtype",collection:"items"}//hedhi t9olo li houa classe mere
const userSchema = new mongoose.Schema({
name: { type: String},
email : { type: String},
password : { type: String},
phone : { type: Number,},
token: { type: String },
},baseOption //hedhi t9olo li houa classe mere
)
//crypt
userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password') || this.isNew) {
            const saltRounds = 10;
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
        }
        next();
    } catch (err) {
        next(err);
    }
});
module.exports=mongoose.model("user",userSchema)
