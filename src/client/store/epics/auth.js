//// All the epics related to authentication
import { of } from 'rxjs';
import { map , mergeMap ,mapTo, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable';
import * as authActionTypes from '../actionTypes/auth';

export const doSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.ACTION),
    map(action => ({type:authActionTypes.SIGN_UP.PENDING, payload:action.payload}) )
);

export const doLogin = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.LOGIN.ACTION),
    map(action => ({type:authActionTypes.LOGIN.PENDING, payload:action.payload}) )
);

export const performSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.PENDING),
    mergeMap(action => {
        //// send request to perform actual signup
        return ajax.post("/api/signUp" , action.payload.data , {
            'content-type' : 'application/json'
        }).pipe(map(response => {
            action.payload.history.replace("/login");
            return {type: authActionTypes.SIGN_UP.SUCCESS}
        }),catchError(error => {
            console.log("error thrown",error);
            return of({ type : authActionTypes.SIGN_UP.ERROR , error})
        }));
    })
);

export const performLogin = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.LOGIN.PENDING),
    mergeMap(action => {
        return ajax.post("/api/login" , action.payload.data , {
            'content-type' : 'application/json'
        }).pipe(map(data => {
            console.log("Response =========> ",data.response);
            action.payload.history.replace("/home");
            return {type: authActionTypes.LOGIN.SUCCESS,data:data.response}
        }),catchError(error => {
            console.log("Error thrown::",error);
            return of({ type : authActionTypes.LOGIN.ERROR , error});
        }));
    })
);