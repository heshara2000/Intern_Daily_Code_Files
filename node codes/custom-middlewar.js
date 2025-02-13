const express = require('express');
const app = express();

const requesTimestamp = (req, res, next) => {
  const timeStamp = new Date().toISOString();

  // Use backticks for template literals
  console.log(`${timeStamp} from ${req.method} to ${req.url}`);
  next();
};

app.use(requesTimestamp);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.get('/about', (req, res) => {
  res.send('my about page');
  console.log('im in the about page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
