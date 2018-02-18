import { REPOS_GET_STARRED_COMPLETE } from 'repos/ducks';
import { updateApiLimits } from 'apiLimits/ducks';
import { getApiLimits } from 'apiLimits/selectors';

/**
 * List of API action types which we should watch
 * for containing the current state of our rate limits.
 *
 * @type {Array}
 */
const VALID_API_ACTIONS = [
    REPOS_GET_STARRED_COMPLETE
];

/**
 * Keeps the state of our current API rate limit details in sync with
 * GitHub's service.
 *
 * @param  {Object} store - Redux store instance
 * @return {void}
 */
const apiRateLimitMiddleware = ({ getState, dispatch }) => next => action => {
    const { headers } = action.payload.data || {};

    // Only apply to the API response actions which
    // are dispatched after interacting with the GitHub API.
    if(VALID_API_ACTIONS.includes(action.type)
        && ! action.error
        && headers instanceof Headers
    ){
        let apiRateDetails = getApiLimits(getState());

        if(headers.has('x-ratelimit-remaining')){
            apiRateDetails = {
                ...apiRateDetails,
                remaining: parseInt(headers.get('x-ratelimit-remaining'), 10)
            };
        }
        if(headers.has('x-ratelimit-reset')){
            apiRateDetails = {
                ...apiRateDetails,
                reset: parseInt(headers.get('x-ratelimit-reset'), 10)
            };
        }

        dispatch(updateApiLimits(apiRateDetails));
    }

    next(action);
}

export default apiRateLimitMiddleware;
