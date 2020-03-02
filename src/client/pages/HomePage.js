import React , {useCallback, useEffect} from 'react';
import theme from '../styles/theme';
import { deepMerge } from 'grommet/utils';
import { Redirect } from 'react-router-dom';


const Home = (props) => {



 return (
    <Redirect to = "/login" />
    // <Box background="primaryLightColor" pad="none" gap="none" fill="vertical">
    //     <AppBar background="transparent">
    //           <Grommet theme = {customTheme}>
    //             <Button label="Login" color="primaryDarkColor" onClick = {handleLoginClick} primary={false}/>
    //             <Anchor label="SignUp" size="medium" onClick = {handleSignupClick} margin={{horizontal:"small"}}/>
    //           </Grommet>
    //     </AppBar>
    // </Box>
    )
}

export default { component :  Home};