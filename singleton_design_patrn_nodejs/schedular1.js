const cron = require('node-cron');
const task = () =>{
    console.log('Task is running every minute',new Date());
    // Add your task logic here
}

cron.schedule('* * * * *',task); // Schedule the task to run every minute