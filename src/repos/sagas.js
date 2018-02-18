// @flow
/* global __PRODUCTION__ */
import {
    takeLatest,
    call,
    put,
    all
} from 'redux-saga/effects';
import { type Saga } from 'redux-saga';

import {
    getStarredReposComplete,
    REPOS_GET_STARRED_REQUEST,
    type ExpectedApiResponse
} from './ducks';
import { getRepoIssues } from 'issues/ducks';
import { get } from 'utils/http';
import { QUEUE_MIN_THRESHOLD } from 'config/constants';



/**
 * Fetch the details of a given user's starred repositories
 *
 * @param {FSAModel} action - Redux action object
 */
export const getStarredReposSaga = function* (action: FSAModel): Saga<void>{
    const { payload: { username } = {} } = action;

    try {
        if( ! username){
            return;
        }

        const resp: ExpectedApiResponse = yield call(get, `https://api.github.com/users/${username}/starred`);
        const starredRepos = resp.data;

        // @TODO: Queue after 5 repos to prevent hitting the API limit
        if(Array.isArray(starredRepos) && starredRepos.length > 0){
            yield all(
                starredRepos
                    .filter( (repo: Object) => ! repo.archived )
                    .filter( (repo: Object) => repo.has_issues )
                    .slice(0, QUEUE_MIN_THRESHOLD - 1)
                    .map(
                        ({ full_name: repoName }: Object) =>  put(getRepoIssues(repoName))
                    )
            );
        }

        yield put(getStarredReposComplete(resp));
    }
    catch (error){
        yield put(getStarredReposComplete(error, true));
        if( ! __PRODUCTION__){ throw error; }
    }
}

export default function* (): Saga<void>{
    yield takeLatest(REPOS_GET_STARRED_REQUEST, getStarredReposSaga);
}
