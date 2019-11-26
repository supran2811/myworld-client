import { createStore , applyMiddleware } from 'redux';
import axios from 'axios';

import reducers from '../client/store/reducers';

export default (req) => {
    const axiosInstance  = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com/',
        headers: { cookie: req.get('cookie') || ''}
    });

    const store = createStore(reducers , {});

    return store;
} 