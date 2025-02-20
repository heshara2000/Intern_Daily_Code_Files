const amqp = require('amqplib');
const logger = require('./loggers');
let connection = null;
let channel = null;

const EXCHANGE_NAME = 'facebook_events'

async function connectRabbitMQ(){
    try{
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'fanout', {
            durable: false
        });
        return channel;

    }
    catch(e){
        logger.error('error connecting rabbitmq',e)
    }
}


async function publishEvent(routingKey, message) {
    if (!channel) {
      await connectToRabbitMQ();
    }
  
    channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
    logger.info(`Event published: ${routingKey}`);
  }

module.exports = {connectRabbitMQ, publishEvent}