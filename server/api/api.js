const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const api = express.Router();

api.get('/', (req, res)=> {
    res.send('Sample response for GET api\n')
});

api.get('/v1', (req, res)=> {
    res.send('Sample response for api/v1\n')
})
api.get('/v2', (req, res)=> {
    res.send('Sample response for GET api/v2\n')
})
api.post('/v2', (req, res)=> {
    res.send('Sample response for POST  api/v2\n')
})

module.exports = api;