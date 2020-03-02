// @flow
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import * as authActions from '../store/actions/auth';
import Copyright from '../components/common/copyright';
import { authError } from '../store/selectors/user'

type Props = {
    history: {
        location: {
            pathname: string
        }
    }
}

const AuthPage = (props: Props) => {
    const { history } = props;
    const dispatch = useDispatch();
    const error = useSelector(authError);

    const doSignup = React.useCallback((data) => {
        dispatch(authActions.signUpNewUser(data, history));
    });

    const doLogin = React.useCallback((data) => {
        dispatch(authActions.loginUser(data, history));
    });

    return <Container component="main" maxWidth="xs">
        {history.location.pathname === '/login' ?
            <LoginForm doLogin={doLogin} error={error} /> : <SignupForm doSignup={doSignup} error={error} />}
        <Box mt={8}>
            <Copyright />
        </Box>
    </Container>
}

export default { component: AuthPage };