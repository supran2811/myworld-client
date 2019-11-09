const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {

    // We need to tell the entry point of the application
    entry: './src/client/index.js',

    /// We need to tell the location where it should generate the output

    output: {
        filename : 'bundle.js',
        path: path.resolve(__dirname , "public")
    }
}

module.exports = merge([config,baseConfig]);