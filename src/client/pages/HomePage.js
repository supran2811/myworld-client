import React from 'react';
import { Box , Anchor, Grommet , Button } from 'grommet';
import AppBar from '../components/common/AppBar';
import theme from '../styles/theme';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(theme , {
    anchor: {
        color : theme.global.colors.primaryDarkColor
    }
});

const Home = (props) => {

 const handleLoginClick = e => {
     console.log("Inside handleLoginClick",props.history);
     props.history.push("/login");
 }

 return (
    <Box background="primaryLightColor" pad="none" gap="none" fill="vertical">
        <AppBar background="transparent">
              <Grommet theme = {customTheme}>
                <Button label="Login" color="primaryDarkColor" onClick = {handleLoginClick} primary={false}/>
                <Anchor label="SignUp" size="medium" margin={{horizontal:"small"}}/>
              </Grommet>
        </AppBar>
    </Box>)
}

export default { component :  Home};