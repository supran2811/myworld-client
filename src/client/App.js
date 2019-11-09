import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Grommet } from 'grommet';

import { fetchCurrentUser } from './actions';

const theme = {
    global: {
      colors:{
          brand:'#228BE6'
      },
      font: {
        family: 'Roboto',
        size: '18px',
        height: '20px',
      },
    },
  };

const App = ({route: { routes }}) => {
    return <Grommet theme={theme}> 
        {renderRoutes(routes)}
    </Grommet>
}

export default { component: App,loadData: ({dispatch}) => dispatch(fetchCurrentUser()) };