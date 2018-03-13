const CLOSE_DIALOG = 'CLOSE_DIALOG';
const LOGOUT_DIALOG = 'LOGOUT_DIALOG';

export function showLogoutDialog() {
    return (dispatch) => {
        dispatch({
            isShow: true,
            type: LOGOUT_DIALOG,
        });
    }
}

export function closeLogoutDialog() {
    return (dispatch) => {
        dispatch({
            isShow: false,
            type: CLOSE_DIALOG,
        });
    }
}

const initialState = {
    isShow: false,
    type: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT_DIALOG:
            return {
                isShow: action.isShow,
                type: action.type,
            };
        case CLOSE_DIALOG:
            return {
                isShow: action.isShow,
                type: action.type,
            };
        default:
            return state;
    }
};