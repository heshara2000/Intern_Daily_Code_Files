const mongoose = require('mongoose');   

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim : true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
      },
      year: {
        type: Number,
        required: [true, "Publication year is required"],
        min: [1000, "Year must be atleast 1000"],
        max: [new Date().getFullYear(), "Year cannot be in the future"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

});
module.exports = mongoose.model('Book', BookSchema);

