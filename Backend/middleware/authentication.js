const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    let token = req.headers.authorization;
    if(token){
       jwt.verify(token,"masai",(err,decode)=>{
        if(err){
            console.log(err);
        }else{
            let UserID = decode.UserID;
            req.body.UserID = UserID;
            next();
        }
       })
    }else{
        res.send("Please Login first")
    }
}

module.exports={authenticate};