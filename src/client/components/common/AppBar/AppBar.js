// @flow

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Box ,Anchor , Grommet} from 'grommet';
import { deepMerge } from "grommet/utils";

import theme from '../../../styles/theme';

const customTheme = deepMerge(theme , {
   anchor: {
      color: theme.global.colors.primaryTextColor
   }
});

type Props = {
   children? : React.Node,
   history: {
      replace : (p:string) => void
   },
   align: string,
   justify: string,
   responsive: boolean,
   background: string,
   pad: string,
   direction: string
}

const AppBar  = withRouter((props:Props) => {

   const onBrandClick = React.useCallback(() => {
      props.history.replace("/");
   });

   return <Box {...props}>
            <Grommet theme={customTheme}>
               <Anchor label="MyWorld" 
                  a11yTitle="Name of the app is My World"
                  onClick = {onBrandClick}
               />
            </Grommet>
            {
               props.children && ( <div>
                  {props.children}
               </div>)
            }
           
   </Box>
});

AppBar.defaultProps = {
   align: "center",
   justify:"between",
   responsive:true,
   background: 'brand',
   pad:"medium",
   direction:"row"
}

export default AppBar;