const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const {getProducts,getProduct,createProduct,deleteProduct,updatedProduct} = require("../controllers/product.controller.js");



router.get('/', getProducts);
router.get("/:id", getProduct);

router.post("/", createProduct);


//update product
router.put("/:id",updatedProduct);

router.delete("/:id",deleteProduct);


module.exports = router;