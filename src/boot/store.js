/* global __PRODUCTION__ */
import {
    combineReducers,
    applyMiddleware,
    createStore,
    compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = __PRODUCTION__
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancers = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

const store = createStore(
    combineReducers(reducers),
    storeEnhancers
);

// kick-start the saga middleware
sagaMiddleware.run(rootSaga);

if(module.hot){
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
    })
}

export default store;
