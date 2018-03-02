const CLOSE_DIALOG = 'CLOSE_DIALOG';
const LOGOUT_DIALOG = 'LOGOUT_DIALOG';

export function showLogoutDialog() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_DIALOG,
            isShow: true,
        });
    }
}

export function closeLogoutDialog() {
    return (dispatch) => {
        dispatch({
            type: CLOSE_DIALOG,
            isShow: false,
        });
    }
}

const initialState = {
    type: CLOSE_DIALOG,
    isShow: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT_DIALOG:
            return {
                ...state,
                type: action.type,
                isShow: action.isShow,
            };
        default:
            return {
                type: CLOSE_DIALOG,
                isShow: false,
            };
    }
}