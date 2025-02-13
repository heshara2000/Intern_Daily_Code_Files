const EventEmitter = require('events');

const myFirstEmitter = new EventEmitter();
//register a listner
myFirstEmitter.on('newSale', (name) => {
    console.log(`There was a new sale by ${name}`);
});

myFirstEmitter.emit('newSale', 'John');
