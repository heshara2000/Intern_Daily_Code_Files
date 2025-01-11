const Product = require("../models/product.model");


const getProduct = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
const getProducts = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const createProduct = async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const updatedProduct = async (req,res) => {
    try {
            const {id} = req.params;
        
            const product = await Product.findByIdAndUpdate(id, req.body, {new: true}, (err, product) => {
                if (err) {
                    res.status(404).json({ message: 'Product not found' });
                }
                //const updatedProduct = await product.findById(id);
                res.status(200).json(updatedProduct);
                });
          }
          catch (err) {
            res.status(500).json({ message: err.message });
        
          }
}

const deleteProduct = async (req,res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(product == null){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    }catch (err){
        res.status(500).json({message : err.message});

    }
}

module.exports = {
    getProducts,
    getProduct,
    updatedProduct,
    createProduct,
    deleteProduct
}