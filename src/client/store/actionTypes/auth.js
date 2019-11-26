import { defineAction } from 'redux-define'
import { PENDING,ERROR,SUCCESS } from '../constant'

//// ACTION TYPES
export const SIGN_UP = defineAction('DO_SIGNUP',[PENDING,ERROR,SUCCESS]);
export const LOGIN = defineAction('DO_LOGIN',[PENDING,ERROR,SUCCESS]);