import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import intl from 'react-intl-universal';
import { renderRoutes } from 'react-router-config';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './styles/theme';
import Routes from './Routes';
import reducers from './store/reducers';
import epics from './store/epics';

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, window.INITIAL_STATE, composeEnhancers(applyMiddleware(epicMiddleware)));

require('intl/locale-data/jsonp/en.js');

intl.init({currentLocale:'en-US',locales : { 'en-US' : window.LOCALES }});

epicMiddleware.run(epics);

function Main() {
    React.useEffect(() => {
        
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {renderRoutes(Routes)}
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
}

ReactDom.hydrate( <Main />, document.getElementById('root'));