// @flow

/**
 * Data structure from a GET request using the internal
 * GET HTTP util.
 *
 * @type ExpectedApiResponse
 */
export type ExpectedApiResponse = {
    data: State,
    headers: Headers
};

export type State = {
    public_repos: number,
    public_gists: number,
    created_at: string,
    updated_at: string,
    avatar_url: string,
    following: number,
    followers: number,
    html_url: string,
    location: string,
    login: string,
    name: string,
    bio: ?string,
    id: number
};

export const defaultState: State = {
    public_repos: 0,
    public_gists: 0,
    created_at: '',
    updated_at: '',
    avatar_url: '',
    following: 0,
    followers: 0,
    html_url: '',
    location: '',
    login: '',
    name: '',
    bio: '',
    id: 0
};

//
// ACTION CONSTANTS
//

export const USER__GET_REQUEST = 'USER.GET.REQUEST';
export const USER__GET_COMPLETE = 'USER.GET.COMPLETE';

//
// ACTION CREATORS
//
export const getUser = (username: string): FSAModel => ({
    type: USER__GET_REQUEST,
    payload: { username },
    error: false
});

export const getUserComplete = (data: State | ExpectedApiResponse | Error): FSAModel => ({
    type: USER__GET_COMPLETE,
    payload: {
        data: data instanceof Error ? data.message : data
    },
    error: data instanceof Error
});

//
// REDUCER
//

export default (prevUserState: State = defaultState, action: FSAModel): State => {
    const { payload: { data } = {}, error } = action;

    switch(action.type){
        case USER__GET_REQUEST:     return defaultState;
        case USER__GET_COMPLETE:
            if(error){
                return defaultState;
            }

            // Account for ExpectedAPIResponse + API data being passed directly
            const _data = ('data' in data && 'headers' in data)
                ? data.data
                : data;

            return {
                ...defaultState,
                ..._data
            }
    }

    return prevUserState;
}
