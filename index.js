const express=require("express")
const mongoose=require("mongoose")
const routes=require("./Routes/UserRoute")
require('dotenv').config()
const app=express();
app.use(express.json())

mong=process.env.Mongo_URL
port=process.env.PORT
mongoose.connect(mong).then(()=>{
    console.log("database connected successfully")
    app.listen(port,()=>{
        console.log(`app running on the port ${port}`)
    });
}).catch((error)=>console.log(error))
app.use("/apis",routes)