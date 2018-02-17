/* eslint-disable */
/* global __PRODUCTION__ */
import { takeEvery, call, put } from 'redux-saga/effects';

import {
    getRepoIssuesComplete,
    ISSUES_GET_STARRED_REQUEST
} from './ducks';
import { get } from 'utils/http';

/**
 * Fetch all open issues for a given repo. This is
 * currently filtered to only display issues with a 'help wanted' label.
 *
 * @param {FSAModel} action - Redux action object
 */
export const getRepoIssuesSaga = function* (action){
    const { payload: { repoName } = {} } = action;

    try {
        if( ! repoName)
            return;

        const repoIssues = yield call(get, `https://api.github.com/repos/${repoName}/issues?labels=help+wanted`);

        yield put(getRepoIssuesComplete(repoName, repoIssues));
    }
    catch (error){
        yield put(getRepoIssuesComplete(repoName, error, true));
        if( ! __PRODUCTION__){ throw error; }
    }
}

export default function* (){
    // yield takeEvery(ISSUES_GET_STARRED_REQUEST, getRepoIssuesSaga);
}
