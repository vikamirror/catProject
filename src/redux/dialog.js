const SHOW_TEXTEDITOR_DIALOG = 'SHOW_TEXTEDITOR_DIALOG';
const SHOW_DIALOG = 'SHOW_DIALOG';
const CLOSE_DIALOG = 'CLOSE_DIALOG';

export function showTextEditorDialog (config) {
    if (!config.title || !config.onClickConfirmButton) {
        closeDialog();
        return;
    }
    if (!config.textEditor.content instanceof String ||
        !config.textEditor.enableUploadImg instanceof Boolean) {
        closeDialog();
        return;
    }
    return (dispatch) => {
        dispatch({
            type: SHOW_TEXTEDITOR_DIALOG,
            config: {
                isShow: true,
                type: 'textEditor',
                title: config.title,
                inputPlaceholder: config.inputPlaceholder || initialState.inputPlaceholder,
                showCancelButton: config.showCancelButton || initialState.showCancelButton,
                cancelButtonText: config.cancelButtonText || initialState.cancelButtonText,
                showConfirmButton: config.showConfirmButton || initialState.showConfirmButton,
                confirmButtonText: config.confirmButtonText || initialState.confirmButtonText,
                onClickConfirmButton: config.onClickConfirmButton || initialState.onClickConfirmButton,
                modalVerticalAlign: config.modalVerticalAlign || initialState.modalVerticalAlign,
                textEditor: {
                    content: config.textEditor.content,
                    enableUploadImg: config.textEditor.enableUploadImg,
                    changeContentHandler: config.textEditor.changeContentHandler,
                },
            },
        });
    };
}

export function showDialog (config) {
    if (!config.type || !config.title ) {
        closeDialog();
        return;
    }
    return (dispatch) => {
        dispatch({
            type: SHOW_DIALOG,
            state: {
                isShow: true,
                type: config.type,
                title: config.title,
                htmlString: config.htmlString || initialState.htmlString,
                inputPlaceholder: config.inputPlaceholder || initialState.inputPlaceholder,
                showCancelButton: config.showCancelButton || initialState.showCancelButton,
                cancelButtonText: config.cancelButtonText || initialState.cancelButtonText,
                showConfirmButton: config.showConfirmButton || initialState.showConfirmButton,
                confirmButtonText: config.confirmButtonText || initialState.confirmButtonText,
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
    textEditor: {
        content: '',
        enableUploadImg: false
    },
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
        case SHOW_TEXTEDITOR_DIALOG:
            return {
                ...state,
                isShow: action.config.isShow,
                type: action.config.type,
                title: action.config.title,
                inputPlaceholder: action.config.inputPlaceholder,
                showCancelButton: action.config.showCancelButton,
                cancelButtonText: action.config.cancelButtonText,
                showConfirmButton: action.config.showConfirmButton,
                confirmButtonText: action.config.confirmButtonText,
                onClickConfirmButton: action.config.onClickConfirmButton,
                modalVerticalAlign: action.config.modalVerticalAlign,
                textEditor: {
                    ...state.textEditor,
                    content: action.config.textEditor.content,
                    enableUploadImg: action.config.textEditor.enableUploadImg,
                    changeContentHandler: action.config.textEditor.changeContentHandler
                },
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
                textEditor: {
                    ...state.textEditor,
                    content: initialState.textEditor.content,
                    enableUploadImg: initialState.textEditor.enableUploadImg,
                    changeContentHandler: initialState.textEditor.changeContentHandler
                },
            };
        default:
            return state;
    }
};
