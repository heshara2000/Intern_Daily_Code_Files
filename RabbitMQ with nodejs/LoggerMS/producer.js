const amqp = require('amqplib');
const config = require('./config.js');



//step 1 : connect to RabbitMQ server
//step 2 : create a new channel on that connection
//step 3 : create a new exchange on that channel
//step 4 : publish a message to the exchange

class Producer {
    channel;

    // async createChannel () {
    //     const connection = await amqp.connect(config.rabbitMQ.url);
    //     this.channel = await connection.createChannel();
    //     console.log("Channel created successfully");

    // }


    async createChannel() {
        try {
          const connection = await amqp.connect(config.rabbitMQ.url);
          this.channel = await connection.createChannel();
          console.log("RabbitMQ channel created.");
        } catch (error) {
          console.error("❌ Failed to connect to RabbitMQ:", error.message);
        }
      }
      

    async publishMessage (routingKey, message) {
        if (!this.channel) {
            await this.createChannel();
        }


        const exchangeName = config.rabbitMQ.exchangeName;
        //step 3 : create a new exchange on that channel
        await this.channel.assertExchange(exchangeName, "direct");


        const logDetails = {
            logType : routingKey,
            message : message,
            dateTime : new Date(),
        };
        await this.channel.publish(
            exchangeName,routingKey,
            Buffer.from(
                JSON.stringify(logDetails)
            )
        );
        console.log(`The message ${message} is sent to exchange ${exchangeName} `);
        

}
}

module.exports = Producer;