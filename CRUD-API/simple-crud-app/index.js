
// const express = require('express')
// const app = express()
// const mongoose = require('mongoose');
// const product = require('./models/product.model.js');

// app.use(express.json());

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.get('/api/products', async(req, res) => {
//     try{
//         const products= await product.find({});
//         res.status(200).json(products);
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// });
// app.get('/api/products/:id', async(req, res) => {
//     try{
//         const product= await product.findById(req.params.id);
//         if(product == null){
//             return res.status(404).json({message: 'Product not found'});
//         }
//         res.status(200).json(product);
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//     }
// }
// );
// app.post('/api/products', async(req, res) => {
//     try{
//         const product= await product.create(req.body);


//     }catch(err){
//         res.status(500).json({message: err.message});
//     }

// });

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(()=> {
//         console.log('Error connecting to MongoDB');
//         process.exit(1);
//     });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product.model.js'); // Corrected capitalization for consistency
const productRoute = require('./routes/product.route.js');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
//routes
app.use('/api/products', productRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product); // Ensure a response is sent after creation
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//update a product
// app.put('/api/products/:id', async (req, res) => {
//   try {
//     const {id} = req.params;

//     const product = await Product.findByIdAndUpdate(id, req.body, {new: true}, (err, product) => {
//         if (err) {
//             res.status(404).json({ message: 'Product not found' });
//         }
//         //const updatedProduct = await product.findById(id);
//         res.status(200).json(updatedProduct);
//         });
//   }
//   catch (err) {
//     res.status(500).json({ message: err.message });

//   }
// });

//delete
// app.delete('/api/products/:id', async (req, res) => {
//     try{
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if(product == null){
//             return res.status(404).json({message: 'Product not found'});
//         }
//         res.status(200).json({message: 'Product deleted successfully'});
//     }catch{}
// });

// Correct MongoDB connection string with your credentials
//const dbURI = 'mongodb+srv://backenduser:0774804511@Mo@mongocluster.02yue.mongodb.net/?retryWrites=true&w=majority&appName=mongocluster';
const dbURI = 'mongodb+srv://backenduser:0774804511%40Mo@mongocluster.02yue.mongodb.net/?retryWrites=true&w=majority&appName=mongocluster';


mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.log('Error connecting to MongoDB:', err);
    process.exit(1);
  });
