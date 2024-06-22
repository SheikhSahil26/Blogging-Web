const User=require("../models/user");
const Blog=require("../models/blog")
const mongoose=require("mongoose");
const {v4:uuidv4} = require('uuid');
const {setUser}=require("../services/auth");

async function userSignUp(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/login');
}
async function userLogin(req,res){
    const {email,password}=req.body;
    // console.log("hello guys i am console.log");
    const user=await User.findOne({email,password});
    if(!user)return res.render("login",()=>{
        console.log("invalid credentials"); 
    })
   
    const sessionID=uuidv4();
    setUser(sessionID,user);
    res.cookie('uid',sessionID);
    // const username=`Welcome,${user.name}`;
    const data=encodeURIComponent(JSON.stringify(user))
    return res.redirect(`/home?user=${data}`);
    // return res.render("home",{username});   
     
}


async function logout(req,res){
        
    res.clearCookie('connect.sid'); 
    res.clearCookie('uid');
   return res.redirect("/");
} 




module.exports={
    userSignUp,
    userLogin,
    logout,
}