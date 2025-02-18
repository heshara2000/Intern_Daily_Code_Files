const redis = require('redis');

const client = redis.createClient({
    host : 'localhost',
    port : 6670
});

//event ilstner
client.on("error",(error)=>{
    console.log('redis client error occured',error)
});

async function testRedisConnection(){
    try{
        await client.connect()
        console.log('connected to redis');
    }
    catch(e){
        console.log(e);

    }finally{
        await client.quit();
        
    }
}