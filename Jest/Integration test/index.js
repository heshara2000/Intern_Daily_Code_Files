const express = require('express');

const app = express();
app.use(express.json());
app.use("/api/books", bookRoute);

const PORT = 8080;
app.listen(PORT, () => {
    console.log('listening on port ${PORT}');
})