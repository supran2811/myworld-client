import React from 'react';
import { Box } from 'grommet';
import AppBar from '../components/common/AppBar';

const AuthPage = (props) => {
  return  (<Box background="primaryLightColor" pad="none" gap="none" fill="vertical">
        <AppBar />
        <Box background="none" pad="none" gap="none" fill="vertical" justify="center" align="center">
            This is a auth page!!!
        </Box>
    </Box>);
}

export default { component :  AuthPage};