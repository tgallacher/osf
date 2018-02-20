// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { css } from 'glamor';

import store from 'boot/store';
import App from './components/App';

css.global('blockquote', {
    color: '#bbb',
    borderLeft: '3px solid #bbb',
    paddingLeft: '1em'
});

css.global('pre', {
    background: '#fafafa',
    padding: '1em',
    border: '1px solid #ddd',
    overflow: 'auto',
    maxHeight: '40em'
});

const Root = () => (
    <Provider store={ store }>
        <App />
    </Provider>
);

export default Root;
