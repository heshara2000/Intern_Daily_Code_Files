const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;


const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log('Server is running on port ' ,port);
});

require('./schedular1.js'); // Import the scheduler routes

