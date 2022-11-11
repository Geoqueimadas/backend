const express = require('express');
const register = express();

const registerController = require('../controllers/Register');

register.get('/getregister', registerController.index);
register.post('/register', registerController.store);
register.delete('/delregister/:id', registerController.delet);
register.put('/putregister/:id', registerController.updat);

module.exports = register;