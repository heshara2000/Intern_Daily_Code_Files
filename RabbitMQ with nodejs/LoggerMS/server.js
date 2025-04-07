const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer.js');
const producer = new Producer(); 

app.use(bodyParser.json("application/json"));

// app.post("/sendLog", async(req,res, next) => {
//     await producer.publishMessage(req.body.logType, req.body.message);
//     res.send({
//         status : "success",
//         message : "message sent successfully"
//     }); 

// });
app.post("/sendLog", async (req, res, next) => {
    try {
      await producer.publishMessage(req.body.logType, req.body.message);
      res.status(200).send({ status: "Message sent!" });
    } catch (err) {
      console.error("❌ Error sending log:", err.message);
      res.status(500).send({ error: "Failed to send message to RabbitMQ" });
    }
  });
  
app.listen(3000, () => {
    console.log("server started......")
});
