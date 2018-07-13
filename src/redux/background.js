const INITIAL_BACKGROUND = 'INITIAL_BACKGROUND';
const POST_BACKGROUND = 'POST_BACKGROUND';

export function showInitialBackground () {
    return (dispatch) => {
        dispatch({
            type: INITIAL_BACKGROUND,
        });
    };
};

export function showPostBackground () {
    return (dispatch) => {
        dispatch({
            type: POST_BACKGROUND,
        });
    };
}

const bg_home = 'bg_home';
const bg_post = 'bg_post';

const initialState = bg_home;

export default (state = initialState, action) => {
    switch(action.type) {
        case INITIAL_BACKGROUND:
            return bg_home;
        case POST_BACKGROUND:
            return bg_post;
        default:
            return state;
    }
}