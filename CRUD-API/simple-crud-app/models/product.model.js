const mongoose = require('mongoose');
const Schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter the product name"],
        },
        quantity: {
            type: Number,
            required: true,
            default:0
        },
        price: {
            type: Number,
            required: true,
            default:0
        },
        Image: {
            type: String,
            required: true,
            default:""
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', Schema);
module.exports = Product;