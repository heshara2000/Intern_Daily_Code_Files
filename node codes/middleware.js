const express = require('express');
const app = express();


const myFirstMiddleware = (req, res, next) => {
  console.log('I am a middleware');
  next();
};

app.use(myFirstMiddleware);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/about', (req,res) => {
    res.send('my about page');
    console.log('im in the about page');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});