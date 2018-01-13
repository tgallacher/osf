/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';

import store from 'boot/store';
import { getStarredRepos } from 'repos/ducks';

const Root = () => (
    <Provider store={ store }>
        <span>
            <h1>Hello</h1>
            <button onClick={ () => store.dispatch(getStarredRepos('tgallacher')) }>get</button>
        </span>
    </Provider>
);

export default Root;
