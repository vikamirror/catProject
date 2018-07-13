import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import member from './member';
// import fullPageDialog from './fullPageDialog';
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