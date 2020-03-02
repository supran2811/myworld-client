import _ from 'lodash';

import { createSelector } from 'reselect'

export const authError = (state) => {
    return _.get(state , "user.error",null);
}