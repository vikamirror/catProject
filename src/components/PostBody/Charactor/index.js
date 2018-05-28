import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import TextAreaWithImage from '../../FormInputs/TextAreaWithImage';
// import DraftEditor from '../../FormInputs/DraftEditor';
import QuillEditor from '../../QuillEditor';
import { changeCharactor } from '../../../redux/post';

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => (bindActionCreators({
    changeCharactor: changeCharactor,
}, dispatch));
const Charactor = ({isEdit, charactor, changeCharactor}) => {
    const setCharactor = (content) => {
        changeCharactor(content); 
    };
    return (
        <div>
            <label className="font-weight-5" htmlFor="img-upload-btn-charactor">性格、健康狀況圖文詳述</label>
            <QuillEditor
                id="charactor_editor"
                content={charactor}
                contentMaxHeight="480px"
                isEdit={isEdit}
                enableUploadImg={true}
                placeholder="貓咪的故事......"
                saveEditorContent={(content) => setCharactor(content)}
            />
        </div>
    );
};

Charactor.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    charactor: PropTypes.any.isRequired,
    changeCharactor: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Charactor);