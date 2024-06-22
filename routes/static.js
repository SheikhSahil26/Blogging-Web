const cookieParser = require("cookie-parser");
const {Router}=require("express");
const { checkAuth } = require("../middlewares/auth");
const Blog=require("../models/blog");
const User = require("../models/user");
const router=Router();
const mongoose=require("mongoose");

let username="";
router.get("/",async(req,res)=>{
    username="Blogging App";
    const blogName=""
    const blogDescription="";
    const allBlogs=await Blog.find();
    return res.render('home',{allBlogs,username});
    // // if(data.message===undefined)
    // //     ans="Blogging App"
    // // else 
    //     ans=data.message;
    // return res.render("home",{ans});
})

router.get("/home",async(req,res)=>{
    const data=JSON.parse(decodeURIComponent(req.query.user));
    const allBlogs=await Blog.find();
    const username=data.name;
    const userId=data._id;
    return res.render("home",{allBlogs:allBlogs,username,userId:userId})
})

router.get("/profile",async(req,res)=>{
    const ID=new mongoose.Types.ObjectId(req.query.userId);
    const data=await User.findById(ID);
    const profileImg=data.profileImageUrl;
    const username=data.name;
    const allBlogs=await Blog.find({createdBy:data._id});
    return res.render("profile",{allBlogs:allBlogs,username,userId:ID,profileImg:profileImg});
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login");
})




module.exports=router;