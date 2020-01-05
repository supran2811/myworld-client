import { matchRoutes } from 'react-router-config';

import Routes from '../client/Routes';
import renderer from './renderer';
import createStore from './createStore';

const renderServerSide = (req, res, next) => {
    const store = createStore(req);

    Promise.all(matchRoutes(Routes, req.path).map(({ route: { loadData } }) => {
        return loadData ? loadData(store) : Promise.resolve(null);
    }).map(promise => new Promise((resolve) => promise.then(resolve).catch(resolve)))).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.notFound) {
            res.status(404);
        }
        if (context.url) {
            res.redirect(301, context.url);
        }
        res.send(content);
    });
}

export default renderServerSide;