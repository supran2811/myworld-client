import React from 'react';
import { Box } from 'grommet';

import { Anchor } from 'grommet';

const AppBar  = (props) => {
   return <Box direction="row"
   align="center"
   justify="between"
   responsive="true"
   background='brand'
   pad="medium"
   {...props}
   >
       <Anchor label="MyWorld" />
       <div>
          {...props.children}
       </div>
   </Box>
}

export default AppBar;