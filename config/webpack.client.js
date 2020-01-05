const path = require('path');
// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const webpack = require('webpack');
const config = {

    mode: 'development',
    devtool: 'cheap-module-source-map',

    // We need to tell the entry point of the application
    entry: ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
        './src/client/index.js'],

    /// We need to tell the location where it should generate the output
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, "../build"),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new LodashModuleReplacementPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new ErrorOverlayPlugin()
    ]
}

module.exports = config;    //merge([config,baseConfig]);