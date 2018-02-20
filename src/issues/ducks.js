// @flow
import { REPOS_GET_STARRED_REQUEST } from 'repos/ducks';

export type State = {
    [full_name: string]: Object[]
};
export type ExpectedApiResponse = {
    data: Array<Object>,
    headers: Headers
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
    },
    error: false
});

export const getRepoIssuesComplete = (repoName: string, data: ExpectedApiResponse | Error, error?: boolean = false): FSAModel => ({
    type: ISSUES_GET_STARRED_COMPLETE,
    payload: {
        data: data instanceof Error ? data.message : data,
        repoName
    },
    error
});

//
// REDUCER
//

export default (prevState: State = defaultState, action: FSAModel): State => {
    const {
        error,
        payload: { data = {}, repoName } = {}
    } = action;

    if(error){
        return defaultState;
    }

    switch(action.type){
        case REPOS_GET_STARRED_REQUEST:
            return defaultState;
        case ISSUES_GET_STARRED_COMPLETE:

            // Only add issues that have the right labels we are looking for.
            // A repo might have open issues, but might not have any that have
            // the labels we are searching for.
            if(data.data.length == 0){
                return prevState;
            }

            // We'll discard the API header data
            return {
                ...prevState,
                [repoName]: repoName in prevState
                    ? prevState[repoName].concat(data.data)
                    : data.data
            }
    }

    return prevState;
}
