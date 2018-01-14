// import { assert } from 'chai';
import { all } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { get } from 'utils/http';
import { getStarredReposSaga } from '../sagas';
import { getStarredReposComplete } from '../ducks';

describe('repos.saga', () => {
    it('makes the basic request', () => {
        const fakeAPIResp = [
            { full_name: 'foobar' }
        ];

        const testAction = {
            payload: { username: 'foobar' }
        };

        return expectSaga(getStarredReposSaga, testAction)
            .provide([
                [matchers.call.fn(get), fakeAPIResp]
            ])
            .put(getStarredReposComplete(fakeAPIResp))
            .run();
    });

    it('cancels the request if no username supplied', () => {
        const testAction = {
            payload: { username: undefined }
        };

        return expectSaga(getStarredReposSaga, testAction)
            .not.call.fn(get) // Should cancel before reaching this
            .run();
    });

    it('handles an error inside the saga flow', () => {
        global.__PRODUCTION__ = true;
        const err = new Error('some error');
        const testAction = {
            payload: { username: 'foobar' }
        };

        return expectSaga(getStarredReposSaga, testAction)
            .provide([
                [matchers.call.fn(get), throwError(err)]
            ])
            .not.call.fn(all)                               // Goes straight to error handler + doesn't make sepaerate requests
            .put(getStarredReposComplete(err, true))
            .run();
    });
});
