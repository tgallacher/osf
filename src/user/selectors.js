// @flow
import { createSelector } from 'reselect';

import { defaultState, type State } from './ducks';

const getRootUserSlice = (state: Object): State => state.user;

/**
 * Retrieve the current user object.
 *
 * @returns {UserState} Given user details
 */
export const getUser: (state: Object) => State = getRootUserSlice;

/**
 * Determine if we have loaded any user data yet.
 *
 * @returns boolean
 */
export const hasUser = createSelector(
    getRootUserSlice,
    (user: State): boolean => user !== defaultState
);
