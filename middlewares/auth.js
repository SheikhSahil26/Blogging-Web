const {getUser}=require("../services/auth");

async function checkAuth(req,res,next){
    const  userUid=req.cookies.uid;
    const user=getUser(userUid); 
    req.user=user;
    next();
}
async function restrictToLoggedInUserOnly(req,res,next){
    const userUid=req.cookies.uid;
    if(!userUid)return res.redirect("/login");
    const user=getUser(userUid);
    req.user=user;
    next();
}

module.exports={
    checkAuth,
    restrictToLoggedInUserOnly,
}