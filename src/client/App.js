import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Grommet } from 'grommet';
import theme from './styles/theme';

const App = ({ route: { routes } }) => {
    return <Grommet theme={theme}>
        {renderRoutes(routes)}
    </Grommet>
}

export default { component: App };