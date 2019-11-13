import React from 'react';
import { Box } from 'grommet';
import AppBar from '../components/common/AppBar';

const Home = () => {
 return (
    <Box background="primaryColor" pad="none" gap="none" fill="vertical">
        <AppBar background="transparent">
           
            <div>
                <span>Login</span>
                <span>SignUp</span>
            </div>
        </AppBar>
    </Box>
        
    )
}

export default { component :  Home};