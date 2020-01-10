// @flow
import * as React from 'react';
import { Box } from 'grommet';
import { useDispatch } from 'react-redux'

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import AppBar from '../components/common/AppBar';
import * as authActions from '../store/actions/auth';

type Props =  {
    history: {
        location: {
            pathname:string
        }
    }
}
const AuthPage = (props: Props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const doSignup = React.useCallback((data) => {
      let signUpdata = {};
      for(let key in data) {
          const { value } = data[key];
          signUpdata[key] = value;
      }
      dispatch(authActions.signUpNewUser(signUpdata,history));
  })

  return  (<Box background="primaryLightColor" pad="none" gap="none" fill="vertical">
        <AppBar background="transparent"/>
        <Box background="none" fill="vertical" justify="center">
        <Box background="primaryTextColor" 
            elevation="small" 
            pad="small" 
            fill={false} 
            width="medium" 
            alignSelf="center"
            responsive={true}>
            { history.location.pathname === '/login'? <LoginForm /> : <SignupForm doSignup = {doSignup}/>}
        </Box>
        </Box>
    </Box>);
}

export default { component :  AuthPage};