const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    postId : {
        type: String,
        required: true,
        unique: true
    },
    content : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        indexe: true,
    },

}, {timestamps: true});
searchSchema.index({content: 'text'});
searchSchema.index({createdAt: -1});

const search = mongoose.model('search', searchSchema);

module.exports = search;