import "core-js/stable";
import path from 'path';
import "regenerator-runtime/runtime";
import express from 'express';
import compression from 'compression';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import responseTime from 'response-time';

import * as logger from './helpers/logger';
import renderServerSideApp from './helpers/renderServerSide';

const { PUBLIC_URL = '' } = process.env;

export const app = express();

app.use(compression());

// Serve generated assets
app.use(
    PUBLIC_URL,
    express.static(path.resolve(__dirname, '../build'), {
        maxage: Infinity
    })
);

// Serve static assets in /public
app.use(
    PUBLIC_URL,
    express.static(path.resolve(__dirname, '../public'), {
        maxage: '30 days'
    })
);

app.use('/locales',express.static(path.resolve(__dirname, './locales'), {
    maxage: '30 days'
}))


app.use(morgan('tiny'));


app.use('/api', proxy("http://localhost:4000", {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
})
);

app.use(
    responseTime((_req, res, time) => {
        res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
        res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`);
    })
);

app.get('*', renderServerSideApp);