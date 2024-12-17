const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/elearning"
const connect =()=>{
    try{
        mongoose.connect(url)
        console.log("connect with success")
        }catch{
            console.log("error")
        }
}
module.exports=connect