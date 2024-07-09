require('dotenv').config();

//requiring all the required things
const express=require('express');
const app=express();
const mongoose=require("mongoose");
const cookieParser=require('cookie-parser');
const {checkAuth,restrictToLoggedInUserOnly}=require("./middlewares/auth");
const multer=require("multer");

//local port 
const port=process.env.PORT || 5000;

//requiring path for views 
//telling that i am usig ejs template 
const path=require('path');
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


//connnecting to mongo db 
const mong = process.env.MONGO_URL || "mongodb+srv://sahilsheikh261204:zilbDfveIEEMi8Ny@unveil.ho6o4dk.mongodb.net/?retryWrites=true&w=majority&appName=unveil";
mongoose.connect(mong)
.then((e)=>console.log("mongoDB connected successfully"));


//middlewares
app.use(express.urlencoded({extended:false}));//for form data
app.use(cookieParser());//for cookie parsing 
app.use('/public',express.static(path.join(__dirname,'/public')));//to display static images to our web 

//routes
const staticRoute=require("./routes/static");
const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");

//registering routes 
app.use("/",staticRoute);
app.use("/user",userRoute);
app.use("/blog",restrictToLoggedInUserOnly,blogRoute);

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})