import { combineEpics } from 'redux-observable';
import authEpics from './auth';

const rootEpics = combineEpics(
    authEpics
);

export default rootEpics;