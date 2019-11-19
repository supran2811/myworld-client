// @flow
import * as React from 'react';
import { Box } from 'grommet';

import SignupForm from '../components/SignupForm';
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
        <Box background="none" pad="none" gap="none" fill="vertical" justify="center" align="center">
            { history.location.pathname === '/login'? "This is a login page" : <SignupForm />}
        </Box>
    </Box>);
}

export default { component :  AuthPage};