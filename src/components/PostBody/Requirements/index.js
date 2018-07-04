import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { removeHTMLTag } from '../../../Utils/stringFormat';
import { CheckBox } from '../../FormInputs';
import { changeRequirements, changeRemark } from '../../../redux/post';
import { showTextEditorDialog } from '../../../redux/dialog';
// import DraftEditor from '../../FormInputs/DraftEditor';
import ReadOnlyEditor from '../../QuillEditor/QuillEditorReadOnly';

import './requirements.css';

const mapStateToProps = state => ({
    post: state.post,
    dialog: state.dialog,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    changeRequirements: changeRequirements,
    changeRemark: changeRemark,
    showTextEditorDialog: showTextEditorDialog,
}, dispatch));
class Requirements extends Component {
    setRequirementCheck (index, bool) {
        // https://stackoverflow.com/questions/35174489/reactjs-setstate-of-object-key-in-array
        // array of objects正確的setState方式: 要先複製state, 建立一個新的reference A;
        // const copyRequirements = this.props.requirements.slice(0);
        // 指定要修改reference A裡面的哪一個位址
        // copyRequirements[index] = { ...copyRequirements[index] };
        // copyRequirements[index].value = bool;
        // ex: newRequirements[3].value = true;
        // this.props.handleState('requirements', copyRequirements);
        // this.setState({requirements: copyRequirements});

        // const copyRequirements = this.props.requirements.slice(0);
        // copyRequirements[index] = { ...copyRequirements[index] };
        // copyRequirements[index].value = bool;
        // this.props.handleState('requirements', copyRequirements);
        this.props.changeRequirements(index, bool);
    }
    saveRemark (confirmValue) {
        if (confirmValue.inputValue) {
            this.props.changeRemark(confirmValue.inputValue);
        }
    }
    render () {
        const {
            isEdit,
            requirements,
            remark,
            showTextEditorDialog,
        } = this.props;
        const textEditorConfig = {
            title: "其它認養條件",
            inputPlaceholder: "其它認養條件...",
            showCancelButton: true,
            cancelButtonText: "取消",
            showConfirmButton: true,
            confirmButtonText: "完成",
            onClickConfirmButton: (confirmValue) => this.saveRemark(confirmValue),
            modalVerticalAlign: "top",
            textEditor: {
                content: remark,
                enableUploadImg: false
            },
        };
        if (isEdit) {
            return (
                <div id="requirements_wrapper">
                    <div className="row">
                        <label className="col-xs-4 col-sm-4" htmlFor="">認養條件</label>
                        <div className="col-xs-12 col-sm-8 group-input">
                            {       
                                requirements.map((requirement, index) => (
                                    <CheckBox 
                                        key={index}
                                        id={requirement.name}
                                        name={requirement.name}
                                        isChecked={requirement.value === true}
                                        label={requirement.desc}
                                        onChangeHandler={(bool) => this.setRequirementCheck(index, bool)}
                                    />
                                ))
                            }
                        </div>    
                    </div>
                    <div className="row">
                        <div className="col-xs-12 group-input">
                            {/* <QuillEditor
                                id="remark_editor"
                                content={remark}
                                contentMaxHeight="auto"
                                isEdit={isEdit}
                                enableUploadImg={false}
                                placeholder="其它認養條件..."
                                saveEditorContent={(content) => this.saveRemark(content)}
                            /> */}
                            <div tabIndex="0" onClick={() => showTextEditorDialog(textEditorConfig)} className="u-div-outline-0">
                                <ReadOnlyEditor
                                    content={remark}
                                    placeholder="其它認養條件..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="requirements_wrapper">
                    <div className="row">
                        <label className="col-xs-4 col-sm-4" htmlFor="">認養條件</label>
                        <div className="col-xs-12 col-sm-8 group-info">
                            {
                                requirements.map((requirement, index) => {
                                    return requirement.value === true ?
                                    <div key={index} className="row">
                                        <div className="col-xs-1 check">
                                            <div className="icon-btn font-red-wine"><i className="icon icon-ok" /></div>
                                        </div>
                                        <div className="col-xs-11 text">{requirement.desc}</div>
                                    </div>
                                    :
                                    ''
                                })
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 group-info">
                            {/* <QuillEditor
                                content={remark}
                                isEdit={isEdit}
                                enableUploadImg={false}
                                placeholder="其它認養條件..."
                            /> */}
                            <div className="editor_wrapper_readOnly">
                                <ReadOnlyEditor
                                    content={remark}
                                    placeholder="其它認養條件..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
Requirements.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    requirements: PropTypes.array.isRequired,
    remark: PropTypes.string.isRequired,
    changeRequirements: PropTypes.func.isRequired,
    changeRemark: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Requirements);