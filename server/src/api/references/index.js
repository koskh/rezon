// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();


router.get('/', (req: express$Request, res: express$Response) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    setTimeout(() => {
        res.end(JSON.stringify({ test1: ['test1', 'test2', 'test3'], test2: ['test21', 'test22', 'test23'], test3: ['test31', 'test32', 'test33'] }));
    }, 2000);
});


module.exports = router;
