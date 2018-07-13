import createHistory from 'history/createMemoryHistory'; // 不是 createBrowserHistory
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import axios from 'axios';

import rootReducer from '../src/redux';
import initState from '../src/redux/initialState';

const domain = process.env.DOMAIN; //`http://${process.env.HOST}:${process.env.SERVER_PORT}`;

const prepInitPostList = () => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${domain}/api/posts`, {loadedIds: []})
            .then((postsRes) => {
                resolve(postsRes.data.posts);
            })
            .catch(err => reject(err));
    });
};

// Create a store and history based on a path
const createServerStore = async (path = '/') => {
    // We don't have a DOM, so let's create some fake history and push the current path
    // const history = createHistory({ initialEntries: [path] });
    const history = createHistory({ initialEntries: [path] });
    
    const initialState = initState;
    
    const postList = await prepInitPostList();
    if (Array.isArray(postList)) {
        initialState.postList = postList;
    }

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