import React , { useEffect , useState } from 'react';
import { renderRoutes } from 'react-router-config';

const App = ({route: { routes }}) => {
    return renderRoutes(routes);
}

export default { component: App };