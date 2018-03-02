const LOGOUT_BG = 'LOGOUT_BG';

export function setBackground() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_BG,
        });
    }
}

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT_BG:
            return [
                'bg_logout',
                ...state    
            ];
        default:
            return state;
    }
}