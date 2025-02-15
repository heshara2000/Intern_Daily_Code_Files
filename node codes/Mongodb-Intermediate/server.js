require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routess/product-routes');
const app = express();

//connect to db
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('mongodb connected succesffully')).catch((e)=>console.log('error'));

//use middlewares
app.use(express.json());
app.use("/products", productRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
});



