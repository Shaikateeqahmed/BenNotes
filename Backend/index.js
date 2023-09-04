const express = require("express");
const {connection} = require("./connection/connection.js");
const {User} = require("./Routes/UserRoute.js");
const {authenticate} = require("./middleware/authentication.js");
const {note} = require("./Routes/NotesRoute.js");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());
app.use('/user',User);
app.use(authenticate);
app.use("/notes",note);

let port = 3000;
app.listen(port,async()=>{
    try {
        await connection;
        console.log(`server is running on a port ${port}`);
    } catch (error) {
        console.log({"Error":error});
    }
})