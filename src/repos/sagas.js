/* global __PRODUCTION__ */
import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
    getStarredReposComplete,
    REPOS_GET_STARRED_REQUEST
} from './ducks';
import { getRepoIssues } from 'issues/ducks';
import { get } from 'utils/http';

/**
 * Fetch the details of a given user's starred repositories
 *
 * @param {FSAModel} action - Redux action object
 */
export const getStarredReposSaga = function* (action){
    const { payload: { username } = {} } = action;

    try {
        if( ! username)
            return;

        const starredRepos = yield call(get, `https://api.github.com/users/${username}/starred`);

        // @TODO: Queue after 5 repos to prevent hitting the API limit
        if(Array.isArray(starredRepos) && starredRepos.length > 0){
            // Only take the first 5 repos
            yield all(starredRepos.slice(0, 4).map(
                ({ full_name: repoName }) =>  put(getRepoIssues(repoName))
            ));
        }

        yield put(getStarredReposComplete(starredRepos));
    }
    catch (error){
        yield put(getStarredReposComplete(error, true));
        if( ! __PRODUCTION__){ throw error; }
    }
}

export default function* (){
    yield takeLatest(REPOS_GET_STARRED_REQUEST, getStarredReposSaga);
}
