// @flow
import { type State } from './ducks';

const getRootApiLimitState = (state: Object): State => state.apiLimits;

export const getApiLimits = getRootApiLimitState;
