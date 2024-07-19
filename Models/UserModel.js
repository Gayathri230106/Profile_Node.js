const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
     First_Name:{
        type:String,
        required:true
     },
     emmm:{
        type:String,
        required:true
     },
    Last_Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Details",userSchema);