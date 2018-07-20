import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './redux';
import initialStateForClient from './redux/initialState';

export const history = createHistory();

// const initialState = {};
const initialState = window.__PRELOADED_STATE__ || initialStateForClient;

const isDevelopment = process.env.NODE_ENV === 'development' ? true : false;

const devMiddleware = [thunk, logger, routerMiddleware(history)];
const prodMiddleware = [thunk, routerMiddleware(history)];
// const enhancers = [];
// const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

let composeEnhancers;
let enhancers;

if (isDevelopment) {
    composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
    enhancers = composeEnhancers(
        applyMiddleware(...devMiddleware),
        // other store enhancers if any
    );
} else {
    composeEnhancers = compose;
    enhancers = composeEnhancers(
        applyMiddleware(...prodMiddleware),
        // other store enhancers if any
    );
};

// if (process.env.NODE_ENV === 'development') {
//     // const devToolsExtension = window.devToolsExtension;
//     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension());
//     }
// }

const store = createStore(rootReducer, initialState, enhancers/*composedEnhancers*/);

export default store;