require('dotenv').config();



const express = require('express');
//import the db
const connectToDB = require('./database/dbs');
const bookroutes = require('./routes/book-routes');
const app = express();

const PORT = process.env.PORT || 3000;

//connect to db

connectToDB();

//middleware -> express.json() -> parse the incoming request with JSON payloads
app.use(express.json());

//api/book/delete/:id
app.use('/api/book', bookroutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});