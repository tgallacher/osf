import { assert } from 'chai';

import reducer, {
    defaultState,
    getStarredRepos,
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
        const state = reducer(defaultState, getStarredReposComplete({
            data: exRepoAPIResp
        }));

        assert.isArray(state);
        assert.lengthOf(state, 1, 'State should only contain a single repo object');
        assert.deepEqual(state[0], exRepoAPIResp[0], 'The stored repo object should match the returned data');
    });

    it('adds an addtional repo object to state correctly', () => {
        const exRepoAPIResp = [{id: 1, name: 'bar', full_name: 'foo/bar'}];
        let state = reducer(defaultState, getStarredReposComplete({
            data: exRepoAPIResp
        }));

        const exRepoAPIResp2 = [{id: 2, name: 'baz', full_name: 'bar/baz'}];
        state = reducer(state, getStarredReposComplete({
            data: exRepoAPIResp2
        }));

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

    it('resets the state when a new get starred repos request is made', () => {
        const exRepoAPIResp = [{id: 1, name: 'bar', full_name: 'foo/bar'}];
        let state = reducer(defaultState, getStarredReposComplete({
            data: exRepoAPIResp
        }));

        assert.lengthOf(state, 1, 'State should only contain a single repo object');

        state = reducer(state, getStarredRepos());
        assert.lengthOf(state, 0, 'State should be initialised to an empty array');
    });
});
