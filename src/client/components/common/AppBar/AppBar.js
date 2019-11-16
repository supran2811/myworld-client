import React from 'react';
import { Box ,Anchor , Grommet} from 'grommet';
import { deepMerge } from "grommet/utils";

import theme from '../../../styles/theme';

const customTheme = deepMerge(theme , {
   anchor: {
      color: theme.global.colors.primaryTextColor
   }
});

const AppBar  = (props) => {
   return <Box direction="row"
      align="center"
      justify="between"
      responsive={true}
      background='brand'
      pad="medium"
         {...props}>
            <Grommet theme={customTheme}>
               <Anchor label="MyWorld" 
                  a11yTitle="Name of the app is My World"
               />
            </Grommet>
            {
               props.children && ( <div>
                  {...props.children}
               </div>)
            }
           
   </Box>
}

export default AppBar;