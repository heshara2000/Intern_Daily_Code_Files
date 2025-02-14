const mongoose = require('mongoose');

const connectToDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://hesharadananjanee:YY7ZChnhJwrOeGMd@cluster0.yghsd.mongodb.net/");
        console.log("connect to db");
        
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }


};

module.exports = connectToDB;