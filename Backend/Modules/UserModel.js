const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    UserName : String,
    Email : String,
    Password : String,
})

const UserModel = mongoose.model("user",UserSchema);

module.exports={UserModel};