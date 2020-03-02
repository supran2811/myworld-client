import * as authActionTypes from '../actionTypes/auth';

const initialState = {
    name: '',
    userName:'',
    email:'',
    token:null,
    error:null
}

export default function reducer(state = initialState , action) {
    switch(action.type) {
        case authActionTypes.LOGIN.ERROR :
        case authActionTypes.SIGN_UP.ERROR : {
            return {
                ...state,
                error: action.error
            }
        }
        case authActionTypes.LOGIN.PENDING:
        case authActionTypes.SIGN_UP.PENDING: {
            return {
                ...state,
                token:null,
                error: null
            }
        }
        case authActionTypes.LOGIN.SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }
    }
    return state;
}