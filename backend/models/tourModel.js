import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
    name : {
       type : String
    },
    creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    tags : [String],
    imageFile : {
        type : String
    },
    likeCount: {
        type: Number,
        default: 0,
    },

}, {timestamps : true})

export default mongoose.model('Tour', tourSchema)