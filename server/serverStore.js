import createHistory from 'history/createMemoryHistory'; // 不是 createBrowserHistory
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../src/redux';

// Create a store and history based on a path
const createServerStore = (path = '/') => {

    // We don't have a DOM, so let's create some fake history and push the current path
    const history = createHistory({ initialEntries: [path] });
    
    const initialState = {};
    
    const middleware = [thunk, routerMiddleware(history)];
    const enhancers = [];
    const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
    
    const store = createStore(rootReducer, initialState, composedEnhancers);
    return {
        history,
        store
    };
};

export default createServerStore;