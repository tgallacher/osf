import { assert } from 'chai';

import reducer, {
    defaultState,
    getStarredReposComplete
} from '../ducks';

describe('repos.reducer', () => {
    it('returns the correct initial state', () => {
        const state = reducer(undefined, {type: '@@REDUX/INIT'});

        assert.isArray(state);
        assert.lengthOf(state, 0, 'State should be initialised to an empty array');
    });

    it('stores a return repository object correctly', () => {
        const exRepoAPIResp = [{id: 1, name: 'bar', full_name: 'foo/bar'}];
        const state = reducer(defaultState, getStarredReposComplete(exRepoAPIResp));

        assert.isArray(state);
        assert.lengthOf(state, 1, 'State should only contain a single repo object');
        assert.deepEqual(state[0], exRepoAPIResp[0], 'The stored repo object should match the returned data');
    });

    it('adds an addtional repo object to state correctly', () => {
        const exRepoAPIResp = [{id: 1, name: 'bar', full_name: 'foo/bar'}];
        let state = reducer(defaultState, getStarredReposComplete(exRepoAPIResp));

        const exRepoAPIResp2 = [{id: 2, name: 'baz', full_name: 'bar/baz'}];
        state = reducer(state, getStarredReposComplete(exRepoAPIResp2));

        assert.isArray(state);
        assert.lengthOf(state, 2, 'State should contain all received repo data');
        assert.deepEqual(state[0], exRepoAPIResp[0], 'The stored repo object should match the returned data');
        assert.deepEqual(state[1], exRepoAPIResp2[0], 'The stored repo object should match the returned data');
    });

    it('resets the state when a request results in an error', () => {
        const state = reducer(defaultState, getStarredReposComplete(new Error('Some API error'), true));

        assert.isArray(state);
        assert.lengthOf(state, 0, 'State should be initialised to an empty array');
    });
});
