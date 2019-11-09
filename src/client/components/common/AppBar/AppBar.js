import React from 'react';
import { Box } from 'grommet';

const AppBar  = (props) => {
   return <Box direction="row"
   align="center"
   justify="between"
   responsive="true"
   background='brand'
   {...props}
   />
}

export default AppBar;