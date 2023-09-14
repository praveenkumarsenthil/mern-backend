const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name :{
            type :String,
            require:[true,"Please Enter a Name"]
        },
        email :{
            type :String,
            require:[true,"Please Enter a Name"]
        },
        password :{
            type :String,
            require:[true,"Please Enter a Name"]
        },
    },
    {
        timestamps :true
    }
    )

module.exports = mongoose.model("User",userSchema)