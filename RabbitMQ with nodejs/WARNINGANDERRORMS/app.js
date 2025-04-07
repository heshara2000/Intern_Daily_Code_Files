const amqp = require("amqplib");



//step 1 : connect to the rabbitmq server
///step 2: create a channel
//step 3 : create a exchange
//step 4 : create a queue
//step 5: bind the queue to the exchange
//step 6: consume the message from the queue

async function consumeMessages(){
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();

    await channel.assertExchange("logExchange", "direct");

    const q = await channel.assertQueue("warningAndErrorsQueue");
    await channel.bindQueue(q.queue, "logExchange", "warning");

    await channel.bindQueue(q.queue, "logExchange", "Error"); 

    channel.consume(q.queue, (msg) => {
        const data = JSON.parse(msg.content);
        console.log("Received message:", data);
        channel.ack(msg); // Acknowledge the message after processing it
    })
}

consumeMessages();