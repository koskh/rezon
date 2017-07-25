const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const references = require('./references');

const api = express.Router();

api.get('/', (req, res) => {
    res.send('Default response for GET /api\n');
});

api.use('/references', references);


module.exports = api;
