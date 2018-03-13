import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import member from './member';
// import background from './background';
import fullPageDialog from './fullPageDialog';
import isSmallDevice from './isSmallDevice';

export default combineReducers({
    routing: routerReducer,
    member,
    fullPageDialog,
    isSmallDevice,
});