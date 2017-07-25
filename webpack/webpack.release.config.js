const webpack = require('webpack');
const pkg = require('./../package.json');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractBootstrap = new ExtractTextPlugin({ filename: 'bootstrap.css', allChunks: true });

const baseConfig = require('./webpack.config');


baseConfig.module.rules.push(
    {
        test: /bootstrap\.css$/,
        use: extractBootstrap.extract({
            fallback: 'style-loader',
            use: {
                loader: 'css-loader',
                options: {
                    sourceMap: false,
                    minimize: true
                }
            }
        })
    },

    {
        test: /global\.(css|pcss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: false,
                    minimize: true,
                    importLoaders: 1,
                }
            },
                'postcss-loader'
            ]
        })
    },

    {
        test: /index\.(css|pcss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[hash:base64:7]',
                    sourceMap: false,
                    importLoaders: 1,
                    minimize: true
                }
            },
                'postcss-loader'
            ]
        })
    }
);

baseConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    extractBootstrap,
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences: true,
            booleans: true,
            loops: true,
            unused: true,
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }),
    new webpack.BannerPlugin(`${pkg.name}   ${new Date()}. RELEASE.`),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('release') },
        PROJECT_ENV: JSON.stringify('release')
    })
);

module.exports = Object.assign({}, baseConfig, {
    // module: {
    //     loaders: baseConfig.module.loaders
    // },

    plugins: baseConfig.plugins
});
