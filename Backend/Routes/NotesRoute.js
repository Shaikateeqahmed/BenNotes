const express = require("express");
const { NoteModel } = require("../Modules/NoteModel");
const note = express.Router();

note.get("/",async(req,res)=>{
    let userid = req.body.UserID;
    let notes = await NoteModel.find({UserID:userid});
    res.send(notes);
});

note.post("/",async(req,res)=>{
    let {Author,Name,Note,UserID} = req.body;
    let newnote = new NoteModel(req.body);
    await newnote.save();
    res.send("note saved successfully");
})

note.patch("/:id",async(req,res)=>{
    let ID = req.params.id;
    let payload = req.body;
    let userID_making_req = req.body.UserID;
    let notes = await NoteModel.find({_id:ID});
    let userID_in_note = notes[0].UserID;
    if(userID_in_note===userID_making_req){
        await NoteModel.findByIdAndUpdate({_id:ID},payload);
        res.send(`Note having id ${ID} is updated`);
    }else{
        res.send("U are not authorized");
    }
    
})

note.delete("/:id",async(req,res)=>{
    let ID = req.params.id;
    let userID_making_req = req.body.UserID;
    let notes = await NoteModel.find({_id:ID});
    let userID_in_note = notes[0].UserID;
    if(userID_in_note===userID_making_req){
        await NoteModel.findByIdAndDelete({_id:ID});
        res.send(`Note having id ${ID} is deleted`);
    }else{
        res.send("U are not authorized");
    }
    
})

module.exports={note};