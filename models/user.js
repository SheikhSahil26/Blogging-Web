const {createHmac,randomBytes}=require("crypto")
const {model,Schema}=require("mongoose");

const userSchema=new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:"public/sukuna-red-5120x2880-16933",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
   },
   {timestamps:true}
);

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified("password"))return;
    
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashedPassword;

    next();
})

const User=model("user",userSchema);

module.exports=User;