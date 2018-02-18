// import { assert } from 'chai';
import { all } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

// import { QUEUE_MIN_THRESHOLD } from 'config/constatns';
import { get } from 'utils/http';
import { getStarredReposSaga } from '../sagas';
import {
    getStarredReposComplete
} from '../ducks';

describe('repos.saga', () => {
    it('makes the basic request', () => {
        const fakeAPIResp = [
            { full_name: 'foobar' }
        ];

        const mockRespObj = {
            data: fakeAPIResp,
            headers: new Headers()
        };

        const testAction = {
            payload: { username: 'foobar' }
        };

        return expectSaga(getStarredReposSaga, testAction)
            .provide([
                [matchers.call.fn(get), mockRespObj]  // get Starred repos
            ])
            .put(getStarredReposComplete(mockRespObj))
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
                [matchers.call.fn(get), throwError(err)]     // get Starred repos
            ])
            .not.call.fn(all)                                // Goes straight to error handler + doesn't make sepaerate requests
            .put(getStarredReposComplete(err, true))
            .run();
    });
});
