import { assert } from 'chai';

import reducer, { defaultState } from '../ducks';
import {
    REPOS_GET_STARRED_REQUEST,
    REPOS_GET_STARRED_COMPLETE
} from 'repos/ducks';
import {
    ISSUES_GET_STARRED_REQUEST,
    ISSUES_GET_STARRED_COMPLETE
} from 'issues/ducks';

describe('ui.reducer', () => {
    it('returns the correct initial state', () => {
        const state = reducer(undefined, {type: '@@REDUX/INIT'});

        assert.isObject(state);
        assert.strictEqual(state, defaultState, 'State should be initialised to the default state instance');
        assert.deepEqual(state, defaultState);
    });

    it('tracks the number of http request being made', () => {
        let state = reducer(defaultState, { type: REPOS_GET_STARRED_REQUEST });
        assert.property(state, 'requesting', 1);

        state = reducer(defaultState, { type: ISSUES_GET_STARRED_REQUEST });
        assert.property(state, 'requesting', 2);

        state = reducer(defaultState, { type: REPOS_GET_STARRED_COMPLETE });
        assert.property(state, 'requesting', 1);

        state = reducer(defaultState, { type: ISSUES_GET_STARRED_COMPLETE });
        assert.property(state, 'requesting', 0);
    });
});
