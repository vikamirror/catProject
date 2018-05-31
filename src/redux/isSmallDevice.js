const SMALL_DEVICE_TRUE = 'SMALL_DEVICE_TRUE';
const SMALL_DEVICE_FALSE = 'SMALL_DEVICE_FALSE';

export function smallDeviceTrue() {
    return (dispatch) => {
        dispatch({
            type: SMALL_DEVICE_TRUE,
        });
    }
}

export function smallDeviceFalse() {
    return (dispatch) => {
        dispatch({
            type: SMALL_DEVICE_FALSE,
        });
    }
}

const initialState = false;

export default (state = initialState, action) => {
    switch(action.type) {
        case SMALL_DEVICE_TRUE:
            return !state;
        case SMALL_DEVICE_FALSE:
            return state;
        default:
            return state;
    }
}