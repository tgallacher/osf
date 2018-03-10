// @flow
import {
    takeLatest,
    call,
    put
} from 'redux-saga/effects';
import { type Saga } from 'redux-saga';

import {
    USER__GET_REQUEST,
    getUserComplete,
    type ExpectedApiResponse
} from './ducks';
import { get } from 'utils/http';


/**
 * Fetch the details of a given user's starred repositories
 *
 * @param {FSAModel} action - Redux action object
 */
export const getUserInfoSaga = function* (action: FSAModel): Saga<void>{
    const { payload: { username } = {} } = action;

    if( ! username){
        yield put(getUserComplete(new Error('Username is not defined')));

        return; // cancel
    }

    try {
        const resp: ExpectedApiResponse = yield call(get, `https://api.github.com/users/${username}`);

        yield put(getUserComplete(resp));
    }
    catch (error){
        yield put(getUserComplete(error));
    }
}

export default function* (): Saga<void>{
    yield takeLatest(USER__GET_REQUEST, getUserInfoSaga);
}
