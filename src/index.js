import 'babel-polyfill';
import express from 'express';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-config';

import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore  from './helpers/createStore';

const app = express();

app.use(express.static("public"));

app.use('/api' , proxy("http://react-ssr-api.herokuapp.com/", {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
 })
);

app.get('*' , (req,res) => {

    const store = createStore(req);

    Promise.all( matchRoutes(Routes , req.path).map( ( { route : { loadData } }  ) => {
        return loadData ? loadData(store) : Promise.resolve(null);
    }).map(promise => new Promise((resolve) => promise.then(resolve).catch(resolve)))).then(() => {
        const context = {};
        const content = renderer(req,store,context);
        
        if(context.notFound) {
            res.status(404);
        }
        if(context.url) {
            res.redirect(301,context.url);
        }
        res.send(content);
    });

});

app.listen(3000 , () => {
    console.log('listening to port 3000');
})