//timers -> pending callbacks-> idle


const crypto = require("crypto");

console.log('1.script start');

setTimeout(()=>{
    console.log('2.settimeout 0s callback');
},0);
setTimeout(()=>{
    console.log('3.settimeout 0s callback');
},0);

setImmediate(()=>{
    console.log('4.set Immediate 0s callback');
},0);

promise.resolve().then(() =>{
    console.log('5. promise resolved');

});

process.nextTick(()=>{
    console.log('6. process.nexttick callback');
});

fs.readFile(
    __filename, () => {
        console.log('input output')
    }
)

crypto.pbbkdf2('secret', 'salt', 10000, 64, 'sha23', (err,key)=> {
    if (err) throw err
    console.group('8 .cpu intensive task');
});



