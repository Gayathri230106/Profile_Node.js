const userSchema=require("../Models/UserModel")
const {mid}=require("../Middleware/Middleware")
const jwt=require('jsonwebtoken')
const Mailgun=require('mailgun.js')
const formdata=require('formdata')
const { text } = require("express")

// const { verify } = require("crypto")
// const nodemailer=require("nodemailer")

require('dotenv').config()
const Secret_key=process.env.SECRET_KEY

const ApiKey=process.env.API_KEY
const domain=process.env.DOMAIN_NAME

const mailgun=new Mailgun(formdata);
const mg= mailgun.client({username: 'api', key: ApiKey});




// const transfer=new nodemailer.createTransport({
//     service:"email",
//     host:"smtp.email.com",
//     port:465,
//     secure:true,
//     auth:{
//         user:"no-reply@pangalink.net",
//         pass:"Kvtja286"
//     }
//   })

// async function sendingmail(to, email, password){
//     const mailoptions={
//         from:"no-reply@pangalink.net",
//         to:to,
//         subject:"Registered Successfully",
//         text:`please login with the following credentials 
//                 email:${email}
//                 password:${password}`
//       }

//       try {
//         const data = await transfer.sendMail(mailoptions);
//         console.log(data);
//         return "Mail sent successfully";
//     } catch (err) {
//         console.error("Error sending mail:", err);
//         return `Error sending mail: ${err.message}`;
//     }
//   }

exports.create_User=async(req,res)=>{
    try{
    console.log("hiii")
    const email=req.body.email
    const user=await userSchema.findOne({email:email})
    console.log("hiii")
    if(user) return res.status(400).json({message:"User already exists"})
    else{
    const create_User=await userSchema.create(req.body)
    console.log(create_User)
    console.log("hello")
    if (!create_User.email || typeof create_User.email !== 'string') {
        console.error("Invalid email address:", create_User.email);
        return res.status(400).json({ message: "Invalid email address" });
    }    
    const token=jwt.sign({userId: create_User.id,email:create_User.email},Secret_key);
    console.log(token)
    mg.messages.create(domain,{
        from: 'medepallisandeep@gmail.com',
        to: create_User.email,
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
    }).then(msg=>console.log(msg))
    //   .catch(err => console.error(err))
        
    // client.message.create(domain, messagedata).then((res)=>{
    //     console.log("hey")
    //     console.log(res);
    //     console.log("hello");
    // })
    
    // let data=await sendingmail (create_User.email, create_User.email, create_User.password)
    // console.log(data)

    
     return res.status(200).json({message:"User created successfully"})  
    // }  
    }
}catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}


exports.update_user=async(req,res)=>{
    try{
        console.log("Heyyy")
        // const id=req.params.id
        // console.log(id)
        // const userExist=await userSchema.findById({_id:id})
        // if(!userExist) return res.status(400).json({message:"user doesn't exists"}) 
        // console.log("heyyyy")
  
        
        const reques=req.params.id
        console.log(reques)
        const updated_Data=await userSchema.findByIdAndUpdate({_id:reques},{...req.body},{new:true})
        console.log("Hlooo")
        // console.log(updated_Data)
        if(!updated_Data) return res.status(400).json({message:"unable to update the data"})
        return res.status(200).json(updated_Data)
    }catch(error){
        return res.status(500).json({Message:"Internal server error"})
    }
}

exports.get_user=async(req,res)=>{
    try{
        const id=req.params.id
        console.log(id)
        const userExist=await userSchema.findById({_id:id})
        console.log("Hiii")
        if(!userExist) return res.status(400).json({message:"user doesn't exists"}) 
        
        return res.status(200).json(userExist)
    }catch(error){
        return res.status(500).json({Message:"Internal server error"})
    }
}

exports.delete_user=async(req,res)=>{
    try{
        const id=req.params.id
        const userExist=await userSchema.findOne({_id:id})
        if(!userExist) return res.status(400).json({message:"user doesn't exists"}) 
        const dele=await userSchema.deleteOne({_id:id})
        if(!dele) return res.status(400).json({message:"unable to delete the user"})
        return res.status(200).json({message:"user deleted successfully"})
    }catch(error){
        return res.status(500).json({Message:"Internal server error"})
    }

}

exports.login=async(req,res)=>{
    try{
     const email=req.body.email
     const user=await userSchema.findOne({email:email})
     if(!user) return res.status(400).json({message:"user doesn't exists"})
     if(user.password!==req.body.password) return res.status(400).json({message:"Incorrect password"}) 
     else{ 
        const token=jwt.sign({email:user.email,id:user._id},Secret_key)
        // console.log(token)
        return res.status(200).json({token,message:"Login successfully"}) 
     }
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}