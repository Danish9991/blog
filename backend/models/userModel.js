import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    googleId :  {
        type : String,
    },
    id : {
        type: String
    }

}, {timestamps : true})

export default mongoose.model('User', userSchema)