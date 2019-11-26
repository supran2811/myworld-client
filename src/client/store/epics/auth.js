//// All the epics related to authentication
import {ofType , map } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import * as authActionTypes from '../actionTypes/auth';

const doSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.ACTION),
    map(action => {
        console.log("Inside doSigup action!!");
    })
);

const epics = combineEpics(
    doSignUp
);

export default epics;