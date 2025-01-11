
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const product = require('./models/product.model.js');

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/products', async(req, res) => {
    try{
        const products= await product.find({});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});
app.get('/api/products/:id', async(req, res) => {
    try{
        const product= await product.findById(req.params.id);
        if(product == null){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
);
app.post('/api/products', async(req, res) => {
    try{
        const product= await product.create(req.body);


    }catch(err){
        res.status(500).json({message: err.message});
    }

});

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(()=> {
        console.log('Error connecting to MongoDB');
        process.exit(1);
    });
