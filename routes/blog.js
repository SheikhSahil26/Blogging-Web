const {Router}=require('express');
const router=Router();
const {createBlog}=require("../controllers/blog");
const {checkAuth}=require("../middlewares/auth");
const Blog=require("../models/blog")
const multer=require('multer');
const path=require('path');
const User=require("../models/user")
const Comment=require("../models/comments")

router.get("/",(req,res)=>{
    return res.render("blog");
});

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,process.env.imgpath);
    },
    filename:function(req,file,cb){
        return cb(null,`${file.originalname}`)
    }
})

const upload=multer({storage});

router.post("/createblog",upload.single('blogImageUrl'),createBlog);

router.get("/delete/:id",async(req,res)=>{
    const blog=await Blog.findById(req.params.id)
    const user=await User.findById(blog.createdBy);
    
    await Blog.findByIdAndDelete(req.params.id);
    const data=encodeURIComponent(JSON.stringify(user))
    return res.redirect(`/home?user=${data}`);
});
router.get("/:blogId/:userId",async(req,res)=>{
    const blog=await Blog.findById(req.params.blogId);
    const allComments=blog.blogComment;
    const flatAllComments=allComments.flat();//use to convert nested array structure into single array format!!!
    const commentDetails=flatAllComments.map(comment=>({
        commentBody:comment.commentBody,
        createdBy:comment.createdBy}))
    const user=await User.findById(req.params.userId);
    let usernames=[];
    for(var i=0;i<commentDetails.length;i++)
    {
        const users=await User.findById(commentDetails[i].createdBy);
        usernames[i]=users.name;
    }
    return res.render("seeblog",{blog,usernames,user,commentDetails});
})

router.post("/comment/:blogId/:userId",async(req,res)=>{
    const blog=await Blog.findById(req.params.blogId);
    const user=await User.findById(req.params.userId);
    const userId=user._id;
    const {comment}=req.body;
    const newComment=new Comment({commentBody:comment,createdBy:userId});
    newComment.save();
    blog.blogComment.push(newComment);
    await blog.save();
    
   
    return res.redirect(`/blog/${blog._id}/${userId}`);
})


module.exports=router;