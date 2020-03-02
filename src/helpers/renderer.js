import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from '../client/styles/theme';
import Routes from '../client/Routes';
import * as locales from '../locales/en-US.json';
import intl from 'react-intl-universal';

require('intl/locale-data/jsonp/en.js');


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
    
    const sheets = new ServerStyleSheets();
    intl.init({currentLocale:'en-US',locales : { 'en-US' : locales }});
    try {
        const content = ReactDOMServer.renderToString(
            sheets.collect(<Provider store={store}>
                <StaticRouter location={req.path} context={context}>
                    <ThemeProvider theme={theme}>
                        {renderRoutes(Routes)}
                    </ThemeProvider>
                </StaticRouter>
            </Provider>));

        // Grab the CSS from our sheets.
        const css = sheets.toString();
        const helmet = Helmet.renderStatic();
        
        const html = `
        <html>
         <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            <style id="jss-server-side">${css}</style>
            ${jsScripts()}
         </head>
         <body>
            <div id="root">${content}</div>
            <script>
                window.LOCALES=${serialize(locales)}
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
}