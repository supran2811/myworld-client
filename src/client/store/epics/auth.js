//// All the epics related to authentication
import { map , mergeMap ,mapTo} from 'rxjs/operators';
import { combineEpics,ofType  } from 'redux-observable';
import * as authActionTypes from '../actionTypes/auth';

export const doSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.ACTION),
    mapTo({type: authActionTypes.SIGN_UP.PENDING})
);

export const performSignUp = (action$: Observable<Action>) => action$.pipe(
    ofType(authActionTypes.SIGN_UP.PENDING),
    mergeMap(action => {
        //// send request to perform actual signup
    })
);