import configureStore from 'redux-mock-store';
import { assert } from 'chai';

import apiRateLimitMiddle from '../apiRateLimit';
import { defaultState, API_LIMITS_UPDATE } from 'apiLimits/ducks';
import { getStarredReposComplete } from 'repos/ducks';

describe('middleware.apiRateLimit', () => {
    it('updates the store with remaining API limit info when a HTTP request has been made to the Github API', () => {
        const mockStore = configureStore([
            apiRateLimitMiddle
        ]);

        const mockLimits = {
            remaining: 32,
            reset: 123456789
        };

        // Initalise the state with the bit we want to test
        const store = mockStore({
            apiLimits: defaultState
        });

        const explHeaders = new Headers();

        explHeaders.append('x-ratelimit-remaining', mockLimits.remaining);
        explHeaders.append('x-ratelimit-reset', mockLimits.reset);

        const explReposResp = {
            data: [],
            headers: explHeaders
        };

        store.dispatch(getStarredReposComplete(explReposResp));

        const dispatchedActions = store.getActions();

        assert.isArray(dispatchedActions);
        assert.isAtLeast(dispatchedActions.length, 1, 'Expected at least 1 action to have been dispatched');

        const updateAPILimitsAction = dispatchedActions.filter( action => action.type === API_LIMITS_UPDATE )

        assert.equal(updateAPILimitsAction.length, 1, 'Expected an action to update API limits to have been dispatched by the apilimit middleware');
        assert.strictEqual(updateAPILimitsAction[0].payload.data.remaining, mockLimits.remaining, 'Expected the remaining Rate limit to have been dispatched with the update');
        assert.strictEqual(updateAPILimitsAction[0].payload.data.reset, mockLimits.reset, 'Expected the remaining Rate reset unix time to have been dispatched with the update');
    });
});
