const EventEmitter = require('events');

class CustomerListner extends EventEmitter {
    constructor() {
        super();
        this.newSale = 'newSale';
    }

    newSaleEvent(name) {
        this.emit(this.newSale, name);
    }
}

const customerListner = new CustomerListner();
customerListner.on('newSale', (name) => {
    console.log(`There was a new sale by ${name}`);
});

