/* eslint-disable */
/**
 * Declare re-usable Flow types which
 * can be consumed app-wide.
 */


/**
 * Flux Standard Action Model
 * @type {Object}
 */
declare type FSAModel = {
    type: string,
    payload?: Object,
    error?: boolean,
    meta?: ?Object
};
