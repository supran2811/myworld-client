import { combineEpics } from 'redux-observable';
import * as authEpics from './auth';

const rootEpics = combineEpics(
    ...Object.values(authEpics)
);

export default rootEpics;