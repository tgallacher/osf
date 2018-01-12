import React from 'react';
import ReactDOM from 'react-dom';

import App from 'scenes';


const render = Component => {
    ReactDOM.render(
        <Component />
        , document.getElementById('rds')
    );
}

render(App);

if(module.hot){
    module.hot.accept('scenes', () => {
        const NextApp = require('scenes/index.jsx').default;

        render(NextApp);
    });
}

