const mongoose = require("mongoose")

const userScheme = new mongoose.Schema(
    {
        name:String,
        password:String,
        contact:Number,
    },
{ collection: "USER" }
)

module.exports = mongoose.model("USER",userScheme)