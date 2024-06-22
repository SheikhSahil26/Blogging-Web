const {model,Schema, default: mongoose}=require("mongoose");

const commentSchema=new Schema({
    commentBody:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"users",
    },
},{timestamps:true});

const Comment=model("comment",commentSchema);

module.exports=Comment;