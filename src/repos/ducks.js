// @flow

export type State = Object[];

export const defaultState = [];

//
// ACTION CONSTANTS
//

export const REPOS_GET_STARRED_REQUEST = 'REPOS.GET.STARRED.REQUEST';
export const REPOS_GET_STARRED_COMPLETE = 'REPOS.GET.STARRED.COMPLETE';

//
// ACTION CREATORS
//

export const getStarredRepos = (): FSAModel => ({
    type: REPOS_GET_STARRED_REQUEST
});

export const getStarredReposComplete = (data: Array<Object> | Error, error?: boolean = false): FSAModel => ({
    type: REPOS_GET_STARRED_COMPLETE,
    payload: {
        data
    },
    error
});

//
// REDUCER
//

export default (prevState: State = defaultState, action: FSAModel): State => {
    const { payload: { data = [] } = {}, error } = action;

    if(error){
        return defaultState;
    }

    switch(action.type){
        case REPOS_GET_STARRED_REQUEST:
            return defaultState;
        case REPOS_GET_STARRED_COMPLETE:
            return prevState.concat(data);
    }

    return prevState;
}
