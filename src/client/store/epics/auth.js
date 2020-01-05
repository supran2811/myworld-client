//// All the epics related to authentication
import { map , mergeMap ,mapTo, catchError} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax'
import { ofType   } from 'redux-observable';
import axios from 'axios';
import * as authActionTypes from '../actionTypes/auth';


export const doSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.ACTION),
    map(action => ({type:authActionTypes.SIGN_UP.PENDING, payload:action.payload}) )
);

export const performSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.PENDING),
    mergeMap(action => {
        console.log("Got action as ",action.payload);
        //// send request to perform actual signup
        return ajax.post("/api/signUp" , action.payload.data , {
            'content-type' : 'application/json'
        }).pipe(map(response => {
            console.log(response);
            action.payload.history.replace("/home");
            return {type: authActionTypes.SIGN_UP.SUCCESS}
        }),catchError(error => {
            console.log("error thrown",error);
            return { type : authActionTypes.SIGN_UP.ERROR}
        }));
    })
);