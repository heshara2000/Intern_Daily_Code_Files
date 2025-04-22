const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const invoices = require('./invoices.json'); // Assuming you have a JSON file with invoice data





const archiveInvoicesTask = () => {
    console.log('Archiving invoices task is running', new Date());

   try{
    const paidInvoices = invoices.filter((item) => {
        return item.status === 'paid';
    })

    if (paidInvoices.length > 0){
        paidInvoices.forEach((item) =>{
            invoices.splice(
                invoices.findIndex((e) => {
                    e.status === item.status;
                }),
                1
            );
        });
        fs.writeFileSync(
            path.join(__dirname, 'invoices.json'),
            JSON.stringify(invoices, null, 2),
            (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                } else {
                    console.log('Invoices archived successfully!');
                }
            }
        );
    }

   }
   catch(err){
        console.error('Error archiving invoices:', err);

   }
};

const schedule = cron.schedule("* * * * *", archiveInvoicesTask); // Runs every hour