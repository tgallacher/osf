import { assert } from 'chai';

import reducer, {
    defaultState,
    updateApiLimits
} from '../ducks';

describe('apiLimits.reducer', () => {
    it('returns the correct initial state', () => {
        const state = reducer(undefined, {type: '@@REDUX/INIT'});

        assert.isObject(state);
        assert.deepEqual(state, defaultState, 'State should be initialised to the default state');
    });

    it('can store GitHub\'s API rate details correctly', () => {
        const exAPIRateDetails = {
            remaining: 23,
            reset: 123243434
        };

        const state = reducer(defaultState, updateApiLimits(exAPIRateDetails));

        assert.isObject(state);
        assert.notStrictEqual(state, defaultState, 'The Redux store should be immutable');
        assert.propertyVal(state, 'remaining', exAPIRateDetails.remaining);
        assert.propertyVal(state, 'reset', exAPIRateDetails.reset);
    });

    it('resets the state when a request results in an error', () => {
        const state = reducer(defaultState, updateApiLimits(new Error('Some API error'), true));

        assert.isObject(state);
        assert.deepEqual(state, defaultState, 'State should be reset to the default state');
    });
});
