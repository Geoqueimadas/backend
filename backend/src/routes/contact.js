const express = require('express');
const contact = express();

const contactController = require('../controllers/Contact');

contact.get('/selectcontact', contactController.index);
contact.post('/postcontact', contactController.store);

module.exports = contact;