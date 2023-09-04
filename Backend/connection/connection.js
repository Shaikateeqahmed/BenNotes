const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://ShaikAteeqAhmed:shaik@cluster0.yyxbopz.mongodb.net/Ben?retryWrites=true&w=majority");

module.exports={connection};