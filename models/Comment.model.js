const {Schema, model} = require("mongoose")

const commentSchema = new Schema ({
    type: {
        type:String,
        required:true,
        min:0
    },
    commentBody:{
        type:String,
        required:true,
        min:0
    }
})

const Comment = model("Comment", commentSchema)
module.exports = Comment;