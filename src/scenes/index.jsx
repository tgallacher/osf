// @flow
import React from 'react';
import { Provider } from 'react-redux';

import store from 'boot/store';
import Header from './components/Header';
import MainContent from './components/MainContent';
// import { getStarredRepos } from 'repos/ducks';

const Root = () => (
    <Provider store={ store }>
        <span>
            <Header title="Enter GitHub username" placeholder="GitHub username..." />
            <MainContent />
        </span>
    </Provider>
);


export default Root;
/*
        <span>
            <h1>Hello</h1>
            <button onClick={ () => store.dispatch(getStarredRepos('tgallacher')) }>get</button>
        </span>
*/
