const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, '../src/scripts/app.js'),
        // another: path.join(__dirname, '../src/scripts/another-module.js'),
        react: [
            'react', 'react-dom'
        ],
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
            //     use:'json-loader'
            // },
            // {
            //     test: /\.png$/,
            //     use:'file-loader'
            // },

            {
                test: /\.(css|pcss)$/,
                // use: [
                //     'style-loader',
                //     // 'css-loader'
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: true,
                //             localIdentName: '[path][name]__[local]--[hash:base64:5]',
                //             sourceMap: true,
                //             importLoaders: 1
                //         }
                //     },
                //     'postcss-loader'
                //
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                        'postcss-loader'
                    ]
                })
            },
        ]
    },

    devtool: 'source-map',

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
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false,
        //     comments: false,
        //     compress: {
        //         sequences     : true,
        //         booleans      : true,
        //         loops         : true,
        //         unused      : true,
        //         warnings    : false,
        //         drop_console: true,
        //         unsafe      : true
        //     }
        // }),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
        new webpack.BannerPlugin(`Copyright ____ 2017.  Released under ____ license. ${(new Date()).toString()}`),

    ]

};
