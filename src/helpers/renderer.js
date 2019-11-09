import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import Routes from '../client/Routes';

export default (req, store,context) => {
    const content = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Provider>);
    const helmet = Helmet.renderStatic();

    const html = `
        <html>
         <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
         </head>
         <body>
            <div id="root">${content}</div>
            <script>
                window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <!-- Compiled and minified CSS -->
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
           
            <!-- Compiled and minified JavaScript -->
            <script src="bundle.js" defer></script>
           
         
         </body>
        </html>
    `
    return html;
}