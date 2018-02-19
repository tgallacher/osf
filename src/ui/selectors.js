// @flow
import { type State } from './ducks';
import { createSelector } from 'reselect';

const getRootUIState = (state: Object): State => state.ui;

export const isLoading = createSelector(
    getRootUIState,
    (ui: State): boolean => ui.requesting > 0
);
