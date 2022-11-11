const express = require('express');
const delay = require('express-delay');
const cors = require('cors');

const contactRoute = require('./src/routes/contact');
const registerRoute = require('./src/routes/register');

const app = express();
app.use(express.json());
app.use(express.Router());
app.use(express.urlencoded({extended: false}));

app.use(delay(1000));

const whiteList = ['http://localhost:3000'];

const corsOptions = {
    origin(origin, callback){
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
};
app.use(cors(corsOptions));

//rotas mensagens
app.get('/selectcontact', contactRoute);
app.post('/postcontact', contactRoute);


//rotas de cadastro
app.get('/getregister', registerRoute);
app.post('/register', registerRoute);
app.delete('/delregister/:id', registerRoute);
app.put('/putregister/:id', registerRoute);

module.exports = app;