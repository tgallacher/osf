// @flow
import { REPOS_GET_STARRED_REQUEST } from 'repos/ducks';

export type State = {
    [full_name: string]: Object[]
};

export const defaultState: State = {};

//
// ACTION CONSTANTS
//
//

export const ISSUES_GET_STARRED_REQUEST = 'ISSUES.GET.STARRED.REQUEST';
export const ISSUES_GET_STARRED_COMPLETE = 'ISSUES.GET.STARRED.COMPLETE';

//
// ACTION CREATORS
//

export const getRepoIssues = (repoName: string): FSAModel => ({
    type: ISSUES_GET_STARRED_REQUEST,
    payload: {
        repoName
    }
});

export const getRepoIssuesComplete = (repoName: string, data: Array<Object> | Error, error?: boolean = false): FSAModel => ({
    type: ISSUES_GET_STARRED_COMPLETE,
    payload: {
        data,
        repoName
    },
    error
});

//
// REDUCER
//

export default (prevState: State = defaultState, action: FSAModel): State => {
    const { payload: { data = [], repoName } = {}, error } = action;

    if(error){
        return defaultState;
    }

    switch(action.type){
        case REPOS_GET_STARRED_REQUEST:
            return defaultState;
        case ISSUES_GET_STARRED_COMPLETE:
            return {
                ...prevState,
                [repoName]: repoName in prevState ? prevState[repoName].concat(data) : data
            }
    }

    return prevState;
}
