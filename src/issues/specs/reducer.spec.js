import { assert } from 'chai';

import reducer, {
    defaultState,
    getRepoIssuesComplete
} from '../ducks';
import { getStarredRepos } from 'repos/ducks';

describe('issues.reducer', () => {
    it('returns the correct initial state', () => {
        const state = reducer(undefined, {type: '@@REDUX/INIT'});

        assert.isObject(state);
        assert.deepEqual(state, defaultState, 'State should be initialised to match the default state');
    });

    it('stores a return repository object correctly', () => {
        const repoName = 'foo/bar';
        const exIssueAPIResp = [{id: 1, url: 'http://foo'}];
        const mockRespObj = {
            data: exIssueAPIResp,
            headers: new Headers()
        };
        const state = reducer(defaultState, getRepoIssuesComplete(repoName, mockRespObj));

        assert.isObject(state);
        assert.isArray(Object.keys(state));
        assert.lengthOf(Object.keys(state), 1);
        assert.strictEqual(Object.keys(state)[0], repoName, 'The keyed id should match');
        assert.deepEqual(state[repoName][0], exIssueAPIResp[0], 'The stored repo object should match the returned data');
    });

    it('adds an addtional repo object to state correctly for the same repo request', () => {
        const repoName = 'foo/bar';
        const exIssueAPIResp = [{id: 1, url: 'http://foo'}];
        const mockRespObj = {
            data: exIssueAPIResp,
            headers: new Headers()
        };

        let state = reducer(defaultState, getRepoIssuesComplete(repoName, mockRespObj));

        const exIssueAPIResp2 = [{id: 2, url: 'http://bar'}];
        const mockRespObj2 = {
            data: exIssueAPIResp2,
            headers: new Headers()
        };
        state = reducer(state, getRepoIssuesComplete(repoName, mockRespObj2));

        assert.isObject(state);
        assert.isArray(Object.keys(state));
        assert.lengthOf(Object.keys(state), 1);
        assert.strictEqual(Object.keys(state)[0], repoName, 'The keyed id should match');
        assert.deepEqual(state[repoName][0], exIssueAPIResp[0], 'The stored repo object should match the returned data');
        assert.deepEqual(state[repoName][1], exIssueAPIResp2[0], 'The stored repo object should match the returned data');
    });

    it('stores issues for more than one repo', () => {
        const repoName = 'foo/bar';
        const exIssueAPIResp = [{id: 1, url: 'http://foo'}];
        const mockRespObj = {
            data: exIssueAPIResp,
            headers: new Headers()
        };

        let state = reducer(defaultState, getRepoIssuesComplete(repoName, mockRespObj));

        const repoName2 = 'bar/baz';
        const exIssueAPIResp2 = [{id: 2, url: 'http://bar'}];
        const mockRespObj2 = {
            data: exIssueAPIResp2,
            headers: new Headers()
        };

        state = reducer(state, getRepoIssuesComplete(repoName2, mockRespObj2));

        assert.isObject(state);
        assert.isArray(Object.keys(state));
        assert.lengthOf(Object.keys(state), 2);
        assert.strictEqual(Object.keys(state)[0], repoName, 'The keyed id should match');
        assert.strictEqual(Object.keys(state)[1], repoName2, 'The keyed id should match');
        assert.deepEqual(state[repoName][0], exIssueAPIResp[0], 'The stored repo object should match the returned data');
        assert.deepEqual(state[repoName2][0], exIssueAPIResp2[0], 'The stored repo object should match the returned data');
    });

    it('resets the state when a request results in an error', () => {
        const repoName = 'foo/bar';
        const state = reducer(defaultState, getRepoIssuesComplete(repoName, new Error('Some API error'), true));

        assert.isObject(state);
        assert.deepEqual(state, defaultState, 'State should be initialised to match the default state');
    });

    it('resets the state when a new get starred repos request is made', () => {
        const repoName = 'foo/bar';
        const exIssueAPIResp = [{id: 1, url: 'http://foo'}];
        const mockRespObj = {
            data: exIssueAPIResp,
            headers: new Headers()
        };

        let state = reducer(defaultState, getRepoIssuesComplete(repoName, mockRespObj));

        assert.isObject(state);
        assert.lengthOf(Object.keys(state), 1);

        state = reducer(state, getStarredRepos());
        assert.deepEqual(state, defaultState, 'State should be initialised to match the default state');
    });
});
