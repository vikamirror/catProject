const LOADING_TRUE = 'LOADING_TRUE';
const LOADING_FALSE = 'LOADING_FALSE';

export function loadingTrue() {
    return (dispatch) => {
        dispatch({
            type: LOADING_TRUE,
        });
    }
}

export function loadingFalse() {
    return (dispatch) => {
        dispatch({
            type: LOADING_FALSE,
        });
    }
}

const initialState = false;

export default (state = initialState, action) => {
    switch(action.type) {
        case LOADING_TRUE:
            return true;
        case LOADING_FALSE:
            return false;
        default:
            return state;
    }
}