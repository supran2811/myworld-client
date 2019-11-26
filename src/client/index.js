import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import Routes from './Routes';
import reducers from './store/reducers';
import epics from './store/epics';

const epicMiddleware = createEpicMiddleware();

const store = createStore(reducers, window.INITIAL_STATE,applyMiddleware(epicMiddleware));

epicMiddleware.run(epics);

ReactDom.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

