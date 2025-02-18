const cors = require('cors');

const configureCors = () =>{
    return cors({
        //origin
        origin : (origin, callback) =>{
            const allowedOrigins = [
                'http://localhost:3000', //local dev
                'https://yourcustomdomain.com' //production domain

            ]
            if (!origin || allowedOrigins){
                callback(null,true) //giving prmissions 
            }else {
                callback(new Error ('not allowe by cors'));
            }
        },
        methods: ['GET', 'POST','PUT','DELETE'],
        allowedHeaders: [
            'content-type',
            'authorization',
            'accept-version'
        ],
        exposedHeaders : ['x-total-count','content-range'],
        credentials : true,
        preflightContinue : false,
        maxAge : 600 ,//10 mins response time
        optionsSuccessStatus:204

    });
}


module.exports = { configureCors };