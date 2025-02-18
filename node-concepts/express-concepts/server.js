require('dotenv').config()
const express = require('express');
//const cors  = require('cors')

const {configureCors} = require('./config/corsConfig');
const {addTimestamp,requestLogger} = require('./middleware/custom-middleware');
const {} = require('./middleware/rateLimiting');
const app = express();
const PORT = process.env.PORT || 3000

//express json middleware

app.use(addTimestamp);
app.use(requestLogger);
app.use(express.json());
app.use(configureCors());
app.use(limiter);

app.listen(PORT,()=>{
    console.log(`server i srunning on port ${PORT}`);
});
