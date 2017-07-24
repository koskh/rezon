const express = require('express');
const path = require('path');

// const api = require('./api/');


// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const configWebpack = require('../webpack/webpack.config');
// const compiler = webpack(configWebpack);

const app = express();
const port = 3000;

const publicPath = path.resolve(__dirname, '../build');

// const options = {
//     noInfo: false,
//     publicPath: configWebpack.output.publicPath
// };
//
// app.use(webpackMiddleware(compiler, {
//     noInfo: false,
//     publicPath: '/',
// }));

// app.use(require("webpack-hot-middleware")(compiler));

app.get('/api/references', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    setTimeout(() => {
        response.end(JSON.stringify({ test1: ['test1', 'test2', 'test3'], test2: ['test21', 'test22', 'test23'], test3: ['test31', 'test32', 'test33'] }));
    }, 2000);
    // response.end(JSON.stringify(['test1', 'test2', 'test3']));
});

app.use(express.static(publicPath));

app.get('*', (request, response) => {
    response.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});

