/* eslint-disable no-console */
process.env.NODE_ENV = 'production';
process.env.PUBLIC_URL = process.env.PUBLIC_URL || '';

const chalk = require('chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');
const {
    measureFileSizesBeforeBuild,
    printFileSizesAfterBuild
} = require('react-dev-utils/FileSizeReporter');

const clientConfig = require("../config/production/webpack.client");
const serverConfig = require("../config/production/webpack.server");

process.on('unhandledRejection', err => {
    throw err;
});

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
const buildFolder = path.resolve(__dirname, "../build");

measureFileSizesBeforeBuild(buildFolder).then(prevFileSize => {
    fs.emptyDirSync(buildFolder);
    return build(prevFileSize);
}).then(result => {
    printResult(result);
}).catch(err => {
    console.log(chalk.red('Failed to compile.\n'));
    console.log((err.message || err) + '\n');
    process.exit(1);
});

function build(prevFileSize) {
    console.log(chalk.blue('\n\tCreating an optimized production build...\n'));
    const clientCompiler = webpack(clientConfig);
    const serverCompiler = webpack(serverConfig);

    return new Promise((resolve, reject) => {
        clientCompiler.run((err, stats) => {
            if (err) {
                return reject(err)
            }
            else {
                console.log(chalk.white('✓ Client webpack build complete'));
            }
            messages = formatWebpackMessages(stats.toJson({}, true));
            if (messages.errors.length) {
                return reject(new Error(messages.errors.join('\n\n')));
            }
            serverCompiler.run((err) => {
                if (err) {
                    return reject(err);
                }
                else {
                    console.log(chalk.white('✓ Server webpack build complete'));
                }
                
                resolve({
                    stats,
                    prevFileSize,
                    warnings: messages.warnings
                });
            })
        })

    });
}

function printResult({ stats, previousFileSizes, warnings }) {
    if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
    } else {
        console.log(chalk.green('Compiled successfully.\n'));
    }
    console.log('File sizes after gzip:\n');
    // printFileSizesAfterBuild(stats, previousFileSizes,buildFolder,WARN_AFTER_BUNDLE_GZIP_SIZE,WARN_AFTER_CHUNK_GZIP_SIZE);
    console.log();
}