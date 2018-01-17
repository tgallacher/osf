// import { all } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { get } from 'utils/http';
import { getRepoIssuesSaga } from '../sagas';
import { getRepoIssuesComplete } from '../ducks';

describe('issues.sagas', () => {
    it('makes the basic request', () => {
        const repoName = 'foobar';
        const fakeAPIResp = [
            { title: 'foobar issue' }
        ];

        const testAction = {
            payload: { repoName }
        };

        return expectSaga(getRepoIssuesSaga, testAction)
            .provide([
                [matchers.call.fn(get), fakeAPIResp]
            ])
            .put(getRepoIssuesComplete(repoName, fakeAPIResp))
            .run();
    });

    it('cancels the request if no reponame supplied', () => {
        const testAction = {
            payload: { username: undefined }
        };

        return expectSaga(getRepoIssuesSaga, testAction)
            .not.call.fn(get) // Should cancel before reaching this
            .run();
    });

    it('handles an error inside the saga flow', () => {
        global.__PRODUCTION__ = true; // prevent error being thrown
        const err = new Error('some error');
        const repoName = 'foobar';
        const fakeAPIResp = [
            { title: 'foobar issue' }
        ];
        const testAction = {
            payload: { repoName }
        };

        return expectSaga(getRepoIssuesSaga, testAction)
            .provide([
                [matchers.call.fn(get), throwError(err)]
            ])
            .not.put(getRepoIssuesComplete(repoName, fakeAPIResp)) // Goes straight to error handler + doesn't make sepaerate requests
            .put(getRepoIssuesComplete(repoName, err, true))
            .run();
    });
});
