const express = require('express');
const app = express();

//root route

app.get('/', (req, res) => {
    res.send('home page');
});

app.get('/products', (req, res) => {
    const product =[
        {
            id: 1,
            name: 'product 1'
        },
        {
            id: 2,
            name: 'product 2'
        }
    ];
    
    res.json(product);
});

//get a single prodycr
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const products =[
        {
            id: 1,
            name: 'product 1'
        },
        {
            id: 2,
            name: 'product 2'
        }
    ];
    const getsingleproduct = products.find(products => products.id === parseInt(req.params.id));

    if (getsingleproduct) {
        res.json(getsingleproduct);
    } else {
        res.status(404).json({ message: 'product not found' });
    }
    res.json(products);

});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
