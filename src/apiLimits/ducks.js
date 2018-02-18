// @flow

export type State = {
    remaining: ?number,
    reset: ?number
};

export const defaultState: State = {
    remaining: null,
    reset: null
};

//
// ACTION CONSTANTS
//
export const API_LIMITS_UPDATE = 'API.LIMITS.UPDATE';

//
// ACTION CREATORS
//
export const updateApiLimits = (data: Object | Error, error: boolean = false): FSAModel => ({
    type: API_LIMITS_UPDATE,
    error,
    payload: {
        data
    }
});

//
// ROOT REDUCER
//
export default (prevApiState: State = defaultState, action: FSAModel): State => {
    const { payload: { data } = {}, error } = action;

    switch(action.type){
        case API_LIMITS_UPDATE:
            return error
                ? defaultState
                : {
                    ...prevApiState,
                    ...data
                };
    }

    return prevApiState;
}
