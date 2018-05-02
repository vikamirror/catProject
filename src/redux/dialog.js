const SHOW_DIALOG = 'SHOW_DIALOG';
const CLOSE_DIALOG = 'CLOSE_DIALOG';

export function showDialog (config) {
    return (dispatch) => {
        dispatch({
            type: SHOW_DIALOG,
            state: {
                isShow: true,
                type: config.type,
                title: config.title,
                htmlString: config.htmlString,
                inputPlaceholder: config.inputPlaceholder || initialState.inputPlaceholder,
                showCancelButton: config.showCancelButton,
                cancelButtonText: config.cancelButtonText,
                showConfirmButton: config.showConfirmButton,
                confirmButtonText: config.confirmButtonText,
                onClickCancelButton: config.onClickCancelButton || initialState.onClickCancelButton,
                onClickConfirmButton: config.onClickConfirmButton || initialState.onClickConfirmButton,
                buttonsAlign: config.buttonsAlign || initialState.buttonsAlign,
                modalVerticalAlign: config.modalVerticalAlign || initialState.modalVerticalAlign,
            }
        });
    }
}

export function closeDialog () {
    return (dispatch) => {
        dispatch({
            type: CLOSE_DIALOG
        });
    }
}

const initialState = {
    isShow: false,
    type: undefined,
    title: '',
    htmlString: '',
    inputPlaceholder: '',
    showCancelButton: false,
    cancelButtonText: '取消',
    showConfirmButton: true,
    confirmButtonText: '確定',
    onClickCancelButton: undefined,
    onClickConfirmButton: undefined,
    buttonsAlign: 'center',
    modalVerticalAlign: 'middle',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SHOW_DIALOG:
            return {
                ...state,
                isShow: action.state.isShow,
                type: action.state.type,
                title: action.state.title,
                htmlString: action.state.htmlString,
                inputPlaceholder: action.state.inputPlaceholder,
                showCancelButton: action.state.showCancelButton,
                cancelButtonText: action.state.cancelButtonText,
                showConfirmButton: action.state.showConfirmButton,
                confirmButtonText: action.state.confirmButtonText,
                onClickCancelButton: action.state.onClickCancelButton,
                onClickConfirmButton: action.state.onClickConfirmButton,
                buttonsAlign: action.state.buttonsAlign,
                modalVerticalAlign: action.state.modalVerticalAlign,
            };
        case CLOSE_DIALOG:
            return {
                ...state,
                isShow: initialState.isShow,
                type: initialState.type,
                title: initialState.title,
                htmlString: initialState.htmlString,
                inputPlaceholder: initialState.inputPlaceholder,
                showCancelButton: initialState.showCancelButton,
                cancelButtonText: initialState.cancelButtonText,
                showConfirmButton: initialState.showConfirmButton,
                confirmButtonText: initialState.confirmButtonText,
                onClickCancelButton: initialState.onClickCancelButton,
                onClickConfirmButton: initialState.onClickConfirmButton,
                buttonsAlign: initialState.buttonsAlign,
                modalVerticalAlign: initialState.modalVerticalAlign,
            };
        default:
            return state;
    }
};
