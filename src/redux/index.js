import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import member from './member';
// import fullPageDialog from './fullPageDialog';
import dialog from './dialog';
import isSmallDevice from './isSmallDevice';
import isLoading from './isLoading';
// import post from './post';
import postList from './postList';

export default combineReducers({
    routing: routerReducer,
    member,
    // fullPageDialog,
    dialog,
    isSmallDevice,
    // citySelect,
    isLoading,
    // post,
    postList,
});