const mongoose = require("mongoose");

const NoteShema = mongoose.Schema({
    Author : String,
    Name : String,
    Note : String,
    UserID : String
})

const NoteModel = mongoose.model("note",NoteShema);

module.exports={NoteModel};