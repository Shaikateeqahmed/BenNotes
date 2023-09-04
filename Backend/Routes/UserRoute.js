const express = require("express");
const { UserModel } = require("../Modules/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = express.Router();

User.get("/",async(req,res)=>{
    res.send("Users page"); 
})

User.post("/signup",async(req,res)=>{
    let {UserName, Email, Password} = req.body;
    if(UserName&&Email&&Password){

        let Is_User_Exist = await UserModel.find({Email});
        if(Is_User_Exist.length>0){
            res.send("User with this email id already exist!");
        }else{
           bcrypt.hash(Password,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                let newuser = new UserModel({UserName,Email,Password:hash});
                await newuser.save()
                res.send("User register successfully")
            }
           })
        }
    }else{
        res.send("PLease fill all the feilds")
    }
});

User.post("/login",async(req,res)=>{
    let { Email, Password} = req.body;
    if(Email&&Password){

        let Is_User_Exist = await UserModel.find({Email});
        if(Is_User_Exist.length>0){
            bcrypt.compare(Password,Is_User_Exist[0].Password,async(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    let token = jwt.sign({UserID:Is_User_Exist[0]._id},"masai");
                    res.send(token);
                }
               })
        }else{
           res.send("Please Singup first")
        }
    }else{
        res.send("PLease fill all the feilds")
    }
});

module.exports={User};