const {Router}=require('express');
const router=Router();
const User=require("../models/user")
const {userSignUp,userLogin,logout}=require("../controllers/user")
const Blog=require("../models/blog")

router.post("/signup",userSignUp);

router.post("/login",userLogin);


// router.get("/home",async(req,res)=>{
//     const data=JSON.parse(decodeURIComponent(req.query.user));
//     username=data.name;
//     const blogName=""
//     const blogDescription="";
//     const allBlogs=await Blog.find();
//     console.log(allBlogs);
//     return res.render('home',{allBlogs,username,blogName,blogDescription});
//     // // if(data.message===undefined)
//     // //     ans="Blogging App"
//     // // else 
//     //     ans=data.message;
//     // return res.render("home",{ans});
// })


// router.get("/profile",async(req,res)=>{
//     const data=JSON.parse(decodeURIComponent(req.query.user));
//     const username=data.name;
//     const allBlogs=await Blog.find({createdBy:data._id});
//     return res.render("home",{allBlogs:allBlogs,username});
// })

router.get("/logout",logout);

// router.get("/blog",(req,res)=>{
//     return res.render("blog");
// });

// router.post("/createblog",createBlog);


module.exports=router;