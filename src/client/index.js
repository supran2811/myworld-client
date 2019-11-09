import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import Routes from './Routes';
import reducers from './reducers';


const axiosInstance = axios.create({
    baseURL: '/api'
});

const store = createStore(reducers, window.INITIAL_STATE ,applyMiddleware(thunk.withExtraArgument(axiosInstance)));

ReactDom.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

