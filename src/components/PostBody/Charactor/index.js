import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReadOnlyEditor from '../../QuillEditor/QuillEditorReadOnly';
import { changeCharactor } from '../../../redux/post';
import { showTextEditorDialog } from '../../../redux/dialog';

const mapStateToProps = state => ({
    post: state.post,
    dialog: state.dialog,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    changeCharactor: changeCharactor,
    showTextEditorDialog: showTextEditorDialog
}, dispatch));
const Charactor = ({isEdit, charactor, changeCharactor, showTextEditorDialog}) => {
    const setCharactor = (confirmValue) => {
        if (confirmValue.inputValue) {
            changeCharactor(confirmValue.inputValue);
        }
    };
    const textEditorConfig = {
        title: "性格、健康狀況圖文詳述",
        inputPlaceholder: "貓咪的故事......",
        showCancelButton: true,
        cancelButtonText: "取消",
        showConfirmButton: true,
        confirmButtonText: "完成",
        onClickConfirmButton: (confirmValue) => setCharactor(confirmValue),
        modalVerticalAlign: "top",
        textEditor: {
            content: charactor,
            enableUploadImg: true
        },
    };
    const EditorWrapper = ({isEdit, children}) => {
        return isEdit ? 
            <div tabIndex="0" onClick={() => showTextEditorDialog(textEditorConfig)} className="u-div-outline-0">
                {children}
            </div>
            :
            <div className="editor_wrapper_readOnly">
                {children}
            </div>
    };
    return (
        <div>
            <label className="font-weight-5" htmlFor="img-upload-btn-charactor">性格、健康狀況圖文詳述</label>
            <EditorWrapper isEdit={isEdit}>
                <ReadOnlyEditor
                    content={charactor}
                    placeholder="貓咪的故事......"
                />
            </EditorWrapper>
        </div>
    );
};

Charactor.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    charactor: PropTypes.any.isRequired,
    changeCharactor: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Charactor);