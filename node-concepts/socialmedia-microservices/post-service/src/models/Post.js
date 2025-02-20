const mongoose = require('mongoose');
const postSchema = new  mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    content : {
        type : String,
        required : true
    },
    mediaIds : {
        type : [String]
    },
    createfAt : {
        type : Date,
        default : Date.now
    }
}, {timestamps : true});


//bcz wew will be having a diff service for serch

postSchema.index({content:'text'});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;