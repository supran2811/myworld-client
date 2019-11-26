// Actions related to authentication

import { createAction } from 'redux-actions';
import * as authActionTypes from '../actionTypes/auth';

//// ACTIONS

export const signUpNewUser = createAction(authActionTypes.SIGN_UP.ACTION);
export const loginUser  = createAction(authActionTypes.LOGIN.ACTION);

