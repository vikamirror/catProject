import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import initStateTree from './initialState';
import member from './member';
import dialog from './dialog';
import isSmallDevice from './isSmallDevice';
import isLoading from './isLoading';
import header from './header';
import post from './post';
import postList from './postList';
import myPosts from './myPosts';
import notification from './notification';
import searchPosts from './searchPosts';
import background from './background';
// import routerLocation from './routerLocation';

import { removeMemberCached } from '../fetch/accessLocalStorage';

const MEMBER_LOGOUT = 'MEMBER_LOGOUT';

const appReducer = combineReducers({
    /* your app’s top-level reducers */
    routing: routerReducer,
    member,
    dialog,
    isSmallDevice,
    isLoading,
    header,
    post,
    myPosts,
    postList,
    notification,
    searchPosts,
    background,
});

export function logout() {
    return (dispatch) => {
        removeMemberCached();
        dispatch({
            type: MEMBER_LOGOUT
        });
    };
};

const rootReducer = (state, action) => {
    if (action.type === MEMBER_LOGOUT) {
        state = {
            ...state,
            member: initStateTree.member,
            post: initStateTree.post,
            myPosts: initStateTree.myPosts,
            notification: initStateTree.notification,
            searchPosts: initStateTree.searchPosts
        };
    };
    return appReducer(state, action);
};

export default rootReducer;

/*
export default combineReducers({
    routing: routerReducer,
    member,
    dialog,
    isSmallDevice,
    isLoading,
    header,
    post,
    myPosts,
    postList,
    notification,
    searchPosts,
    background,
    // routerLocation
});
*/