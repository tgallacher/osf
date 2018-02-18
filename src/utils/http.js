// @flow
import fetch from 'isomorphic-fetch';

/**
 * Standard response structure for any HTTP request
 * @type {Object}
 */
type APIObject = {
    data: any,
    headers: Headers
};

const defHeaders = {
    'Content-Type': 'application/json'
}

/**
 * Simple helper to check response and throw useful error
 * if the Http request did not succeed with 200-300 response.
 *
 * @param {Response} resp - HTTP response object
 * @returns {Object} Http response body
 * @throws {Error} If HTTP error code is encountered
 */
const parseDataAndCheckForHttpErrorsWithThrow = async (resp: Object): Promise<any> => {
    const respData = await resp.json();

    if( resp.status >= 400 ){
        // Github will put an error message in the returned payload
        const msg = respData.message || resp.statusText;

        throw new Error(`${resp.status} Error: ${msg}`);
    }

    return respData;
}

/**
 * Perform a GET request
 *
 * @param  {string} url - API url
 * @param  {Object} headers -  Optional HTTP headers to send with request
 * @returns {Promise} ES6 thenable
 * @throws {Error} If upstream API returns an error code
 * @since 1.0.0
 * @example
 * let data = requests.get('/coupons/coupon/XXXX-XXXX-XXXX-XXXX').then( resp => resp );
 */
export const get = async (url: string, headers: Object = {}): Promise<APIObject> => {
    const options = {
        method: 'GET',
        headers: { ...defHeaders, ...headers }
    };

    const resp = await fetch(url, options);
    const data = await parseDataAndCheckForHttpErrorsWithThrow(resp);

    return {
        data,
        headers: resp.headers
    };
}
