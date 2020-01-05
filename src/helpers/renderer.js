import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import Routes from '../client/Routes';

const sheet = new ServerStyleSheet();

const { NODE_ENV } = process.env;

let assetManifest;
if (NODE_ENV === 'production') {
    assetManifest = require('../../build/asset-manifest.json');
} else {
    assetManifest = {
        'main.js': '/main.bundle.js'
    }
}

const jsScripts = (bundles = []) => {
    const mainJS = assetManifest['main.js'];
    const bundleFilePaths = bundles
        .filter(bundle => bundle.file.match(/\.js$/))
        .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`);

    return [...bundleFilePaths, mainJS]
        .map(
            jsFilePath =>
                `<script type="text/javascript" src="${jsFilePath}" defer></script>`
        )
        .join('');
};

export default (req, store, context) => {
    try {
        const content = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    <StyleSheetManager sheet={sheet.instance}>
                        {renderRoutes(Routes)}
                    </StyleSheetManager>
                </StaticRouter>
            </Provider>);
        const helmet = Helmet.renderStatic();

        const html = `
        <html>
         <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${jsScripts()}
         </head>
         <body>
            <div id="root">${content}</div>
            <script>
                window.INITIAL_STATE = ${serialize(store.getState())}
                window.__ASSET_MANIFEST__ = ${JSON.stringify(assetManifest)}
            </script>
            <!-- Compiled and minified CSS -->
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

         </body>
        </html>
    `
        return html;
    } catch (error) {
        console.error(error);
    }
    finally {
        sheet.seal();
    }
}