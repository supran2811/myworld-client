import React , { useEffect , useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { Grommet } from 'grommet';
import intl from 'react-intl-universal';
import theme from './styles/theme';

// common locale data
require('intl/locale-data/jsonp/en.js');

const App = ({ route: { routes } }) => {
    const [localeInitialised , setLocaleInitialised ] = useState(false);
    useEffect(() => {
        fetch('/locales/en-US.json')
            .then(data => data.json())
            .then(locales => intl.init({currentLocale:'en-US',locales : {
                'en-US' : locales
            }}))
            .then(result => setLocaleInitialised(true));
    },[]);

    return localeInitialised ? <Grommet theme={theme}>
        {renderRoutes(routes)}
    </Grommet> : null;
}

export default { component: App };