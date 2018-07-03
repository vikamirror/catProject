import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

// 在document.getElementById('root')之前, 引入的css
// import './css/bootstrapGrid.css';
// import './css/basic.css';
// import 'normalize.css';
import './bootstrapGrid.css';
// import './animate.css';
import './basic.css';

import store, { history } from './store';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import App from './containers/App';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
unregister();
// registerServiceWorker();