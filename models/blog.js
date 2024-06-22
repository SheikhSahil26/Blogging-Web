const {model,Schema, default: mongoose}=require("mongoose");
const {Comment}=require("./comments");
const blogSchema=new Schema({
    blogName:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
    blogDescription:{
        type:String,
    },
    blogImageUrl:{
        type:String,        
        required:false,
    },
    blogComment:[{
        type:[],
        ref:"comment",
        required:false,
    }],
},{timestamps:true});

const Blog=model("blog",blogSchema);

module.exports=Blog;