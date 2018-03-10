import { assert } from 'chai';

import reducer, {
    getUserComplete,
    defaultState,
    getUser
} from '../ducks';

describe('user.reducer', () => {
    const mockDataResp = {
        login: 'tgallacher',
        id: 6460370,
        avatar_url: 'https://avatars1.githubusercontent.com/u/6460370?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/tgallacher',
        html_url: 'https://github.com/tgallacher',
        followers_url: 'https://api.github.com/users/tgallacher/followers',
        following_url: 'https://api.github.com/users/tgallacher/following{/other_user}',
        gists_url: 'https://api.github.com/users/tgallacher/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/tgallacher/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/tgallacher/subscriptions',
        organizations_url: 'https://api.github.com/users/tgallacher/orgs',
        repos_url: 'https://api.github.com/users/tgallacher/repos',
        events_url: 'https://api.github.com/users/tgallacher/events{/privacy}',
        received_events_url: 'https://api.github.com/users/tgallacher/received_events',
        type: 'User',
        site_admin: false,
        name: 'Tom Gallacher',
        company: null,
        blog: '',
        location: 'UK',
        email: null,
        hireable: null,
        bio: null,
        public_repos: 9,
        public_gists: 5,
        followers: 2,
        following: 2,
        created_at: '2014-01-21T12:54:36Z',
        updated_at: '2018-03-10T14:02:31Z'
    };

    it('returns the correct initial state', () => {
        const state = reducer(undefined, { type: '@@REDUX/INIT' });

        assert.isObject(state);
        assert.strictEqual(state, defaultState, 'State should be initialised to the default instance');
        assert.deepEqual(state, defaultState);
    });

    it('stores the user details correctly', () => {
        let state = defaultState;

        state = reducer(state, getUserComplete(mockDataResp));

        assert.isObject(state);
        assert.containsAllKeys(state, Object.keys(defaultState), 'Should contain at least the keys that will be used within the UI');
        Object
            .keys(defaultState)
            .filter( key => key in mockDataResp )
            .map( key => assert.strictEqual(state[key], mockDataResp[key]) );
    });

    it('resets user data when an error occurs', () => {
        let state = defaultState;
        state = reducer(state, getUserComplete(mockDataResp));
        state = reducer(state, getUserComplete(new Error('Generic API error')));

        assert.isObject(state);
        assert.strictEqual(state, defaultState);
        assert.deepEqual(state, defaultState);
    });

    it('resets the user data when a new user is requested', () => {
        let state = defaultState;

        state = reducer(state, getUserComplete(mockDataResp));
        state = reducer(state, getUser('foobar'));

        assert.isObject(state);
        assert.strictEqual(state, defaultState, 'The user data should be reset when a new user is requested');
        assert.deepEqual(state, defaultState);
    });
});
