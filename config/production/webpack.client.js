const path = require('path');
// const merge = require('webpack-merge');
// const baseConfig = require('./webpack.base');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
    mode:'production',
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader:'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    // We need to tell the entry point of the application
    entry: './src/client/index.js',
    devtool: 'source-map',
    /// We need to tell the location where it should generate the output

    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname , "../../build"),
        publicPath: ''
    },
    plugins: [

        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new LodashModuleReplacementPlugin(),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}

module.exports = config;