import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './redux';

export const history = createHistory();

const initialState = {};

const middleware = [thunk, logger, routerMiddleware(history)];
// const enhancers = [];
// const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
const enhancers = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
)
// if (process.env.NODE_ENV === 'development') {
//     // const devToolsExtension = window.devToolsExtension;
//     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension());
//     }
// }

const store = createStore(rootReducer, initialState, enhancers/*composedEnhancers*/);

export default store;