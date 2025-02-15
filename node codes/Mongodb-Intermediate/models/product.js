const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name : String,
    category : String,
    inStock : Boolean,
    price: Number,
    tags: [String]
});

module.exports = mongoose.model("product", productschema);

