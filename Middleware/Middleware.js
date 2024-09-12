const express=require("express")
const jwt=require("jsonwebtoken")
const userSchema=require("../Models/UserModel")

require("dotenv").config()
const secret=process.env.SECRET_KEY

exports.mid=async(req,res,next)=>{
      try{
       const auth=req.headers["authorization"]
       if(!auth) return res.status(400).json({message:"Header not provided"})
       console.log(auth)
       const tok=jwt.verify(auth,secret)
       console.log("hlooo")
       if(tok){
       req.user=tok
       console.log(req.user)
       }else{
        return res.status(400).json({message:"Invalid user"})
       }
       next()
      }catch(error){
        return res.status(500).json({message:"Internal Server error"})
      }
}
