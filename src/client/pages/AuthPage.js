// @flow
import * as React from 'react';
import { Box } from 'grommet';

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import AppBar from '../components/common/AppBar';

type Props =  {
    history: {
        location: {
            pathname:string
        }
    }
}
const AuthPage = (props: Props) => {
  const { history } = props;
  return  (<Box background="primaryLightColor" pad="none" gap="none" fill="vertical">
        <AppBar />
        <Box background="none" fill="vertical" justify="center">
        <Box background="secondaryLighColor" 
            elevation="small" 
            pad="small" 
            fill={false} 
            width="medium" 
            alignSelf="center"
            responsive={true}>
            { history.location.pathname === '/login'? <LoginForm /> : <SignupForm />}
        </Box>
        </Box>
    </Box>);
}

export default { component :  AuthPage};