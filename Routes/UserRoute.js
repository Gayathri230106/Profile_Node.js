const express= require("express")
const {create_User,update_user,get_user,delete_user, login}=require("../controllers/UserContro")
const {mid}=require("../Middleware/Middleware")
const routes=express.Router()

app=express();


routes.get("/getdata/:id",get_user)
routes.post("/putdata/:id",mid,update_user)
routes.post("/postdata",create_User)
routes.delete("/deletedata/:id",delete_user)
routes.post("/login",login)

module.exports=routes;

