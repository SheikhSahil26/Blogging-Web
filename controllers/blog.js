const Blog=require("../models/blog");
const mongoose=require("mongoose");
const {getUser}=require("../services/auth");
const multer=require('multer');

async function createBlog(req,res){
    const {blogName,blogDescription}=req.body; 
    const part=blogDescription.substring(0,21);
    console.log(req.file.path);
    await Blog.create({
        blogName,
        blogDescription,
        blogImageUrl:req.file.path,
        blogInShort:part,
        createdBy:req.user.id,
        blogComment:[],
    });
    
    // console.log(req.user.name);
    // console.log(req.body.blogDescription);
    const data=encodeURIComponent(JSON.stringify(req.user))
    return res.redirect(`/home?user=${data}`);
}
async function restrictToLoggedInUserOnly(req,res){
    const userUid=req.cookies.uid;
    if(!userUid)return res.redirect("/login");
    return res.redirect("/createblog");
}

module.exports={
    createBlog,
    restrictToLoggedInUserOnly,
}