const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
    /// We need to tell webpack to run it in node
    target: 'node',

    // We need to tell the entry point of the application
    entry: './src/index.js',

    /// We need to tell the location where it should generate the output

    output: {
        filename : 'bundle.js',
        path: path.resolve(__dirname , "build")
    }
}

module.exports = merge([config,baseConfig]);