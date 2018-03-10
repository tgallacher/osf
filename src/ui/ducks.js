// @flow
import {
    REPOS_GET_STARRED_REQUEST,
    REPOS_GET_STARRED_COMPLETE
} from 'repos/ducks';
import {
    ISSUES_GET_STARRED_REQUEST,
    ISSUES_GET_STARRED_COMPLETE
} from 'issues/ducks';

export type State = {
    requesting: number,
    error: ?string
};

export const defaultState = {
    requesting: 0,
    error: null
};

//
// Action Constants
//

export const UI__TOGGLE_LOADING = 'UI.TOGGLE.IS.LOADING';

//
// Action Creators
//

//
// Reducer
//

export default (prevUIState: State = defaultState, action: FSAModel): State => {
    // Error-to-UI handling
    if(prevUIState !== defaultState){
        if(action.error){
            const { payload: { data = null } = {} } = action;

            prevUIState = {
                ...prevUIState,
                error: data // Error message
            };
        }
        else{
            prevUIState = {
                ...prevUIState,
                error: null
            };
        }
    }

    switch(action.type){
        case REPOS_GET_STARRED_REQUEST:
        case ISSUES_GET_STARRED_REQUEST:
            return {
                ...prevUIState,
                requesting: prevUIState.requesting + 1
            };

        case REPOS_GET_STARRED_COMPLETE:
        case ISSUES_GET_STARRED_COMPLETE:
            return {
                ...prevUIState,
                requesting: prevUIState.requesting - 1
            };
    }

    return prevUIState;
};
