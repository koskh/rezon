const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractBootstrap = new ExtractTextPlugin({ filename: 'bootstrap.css', allChunks: true });
// const extractGlobalApplicationStyles = new ExtractTextPlugin({ filename: 'global.css', allChunks: true });


module.exports = {
    entry: {
        index: path.join(__dirname, '../src/scripts/index.js'),
        react: [
            'react', 'react-dom', 'react-router', 'react-router-dom',
            'redux', 'react-redux', 'react-router-redux', 'history'
        ],

        polyfill: 'babel-polyfill',

        lodash: 'lodash'
    },

    output: {
        path: path.resolve('./', 'build'),
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },

            // {
            //     test: /\.json$/,
            //     use: 'json-loader'
            // },

            // {
            //     test: /\.png$/,
            //     use:'file-loader'
            // },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/html', 'index.html'),
            favicon: path.join(__dirname, '../src/media', 'favicon.ico'),
            hash: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['react', 'lodash']
            // children: true,
            // async: true,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),

    ]

};
