



function person(name,callbackFn){
    console.log(`Hello ${name}`);
    callbackFn();
}

function address(){
    console.log('I am from colombo');
}

person('heshara',address);


fs.readFile("input.txt", "utf8", (err,data) => {
    if (err) {
        console.log("error reading file",err);
        return;
    }

    console.log(data)
});