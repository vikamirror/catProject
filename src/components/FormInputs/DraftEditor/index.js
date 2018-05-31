import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import * as imgurAPI from '../../../fetch/imgurAPI';
import { loadingTrue, loadingFalse } from '../../../redux/isLoading';

import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';
import './draftEditorStyle.css';

const imagePlugin = createImagePlugin();
const linkifyPlugin = createLinkifyPlugin();
const plugins = [imagePlugin, linkifyPlugin];

const ImgUploadBtn = ({imgUploadBtnPositionTop, onChangeImage, isEditing}) => {
    let opacityValue = isEditing ? 1 : 0;
    return (
        <div className="position-control__tooltip" style={{top: imgUploadBtnPositionTop, opacity: opacityValue, transition: 'opacity 0.2s'}}>
            <div className="tooltip">
                <div className="img-upload-btn u-push-right">
                    <button className="btn button-circle circle">
                        <div className="icon-btn"><i className="icon icon-picture" /></div>
                    </button>
                    <input type="file" capture="camera" accept="image/*"
                        onChange={(imgEvt) => onChangeImage(imgEvt)}
                    />
                </div>
                <span className="tooltiptext">插入圖片</span>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
}, dispatch));
class DraftEditor extends Component {
    constructor () {
        super();
        this.state = {
            isEditing: false,
            imgUploadBtnPositionTop: 8,
            editorState: EditorState.createEmpty(),
        };
    }
    componentDidMount () {
        if (this.props.content) {
            // this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))});
            this.setState({
                editorState: EditorState.push(this.state.editorState, convertFromRaw(JSON.parse(this.props.content), 'update-contentState'))
            });
        }
    }
    componentWillReceiveProps (nextProps) {
        // this.state = {
        //     editorState: EditorState.push(this.state.editorState, convertFromRaw(this.props.originalContentState), 'update-contentState')
        // }
        if (nextProps.content !== this.props.content) {
            this.setState({
                // editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.content)))
                editorState: EditorState.push(this.state.editorState, convertFromRaw(JSON.parse(nextProps.content), 'update-contentState'))
            });
        }
    }
    render () {
        const { isEdit, enableUploadImg } = this.props;
        if (isEdit) {
            return (
                <div id="draft-wrapper" ref="draftEditor_ref">
                    <div className="editor" onClick={() => this.focusEditor()} onBlur={() => this.onBlurEditor()}>
                        <Editor
                            editorState={this.state.editorState}
                            plugins={plugins}
                            placeholder={this.props.placeholder}
                            onChange={(editorState) => this.onChangeContent(editorState)}
                            ref={(element) => { this.editor = element; }}
                        />
                        {
                            enableUploadImg ?
                                <ImgUploadBtn 
                                    imgUploadBtnPositionTop={this.state.imgUploadBtnPositionTop} 
                                    onChangeImage={(imgEvt) => this.onChangeImgForUpload(imgEvt)}
                                    isEditing={this.state.isEditing} 
                                /> : ''
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div id="draft-wrapper" ref="draftEditor_ref">
                    <div className="editor readOnly">
                        <Editor 
                            editorState={this.state.editorState}
                            plugins={plugins}
                            onChange={(editorState) => this.onChangeContent(editorState)}
                            ref={(element) => { this.editor = element; }}
                            readOnly 
                        />
                    </div>
                </div>
            );
        }
    }
    onChangeContent (editorState) {
        this.setState({editorState: editorState});
        if (this.props.isEdit) {
            this.setState({isEditing: true});
        }
        if (this.props.enableUploadImg) {
            this.setImgUploadBtnPosition();
        }
    }
    setImgUploadBtnPosition () {
        const headerHeight = 56;
        if (findDOMNode(this.refs.draftEditor_ref)) {
            let distanceFromTopOfViewPort = document.getElementById("draft-wrapper").getBoundingClientRect().top;
            // console.log('distanceFromClientTop:', distanceFromClientTop);
            if (distanceFromTopOfViewPort < headerHeight) {
                this.setState({imgUploadBtnPositionTop: headerHeight - distanceFromTopOfViewPort + 16});
            } else {
                this.setState({imgUploadBtnPositionTop: 8});
            }
        }
    }
    onChangeImgForUpload (imgEvt) {
        const imgForUpload = imgEvt.target.files;
        if (imgForUpload && imgForUpload.length === 1) {
            this.props.loadingTrue();
            
            imgurAPI
                .uploadImgur(imgForUpload[0])
                .then((imgurRes) => { 
                    const imgLink = imgurRes.data.data.link;
                    const newEditorState =  imagePlugin.addImage(this.state.editorState, imgLink);
                    this.setState({ editorState: newEditorState });
                    this.props.loadingFalse();
                })
                .catch(err => {
                    console.log('imgurAPI.uploadImgur, error: ', err.message);
                    this.props.loadingFalse();
                });
        };
    }
    onBlurEditor () {
        this.setState({isEditing: false});
        this.saveContent();
    }
    saveContent () {
        const contentState = this.state.editorState.getCurrentContent();
        const stringifyContent = JSON.stringify(convertToRaw(contentState));
        this.props.saveEditorContent(stringifyContent);
    }
    focusEditor () {
        this.editor.focus();
    }
}

DraftEditor.propTypes = {
    content: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
    enableUploadImg: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    loadingTrue: PropTypes.func.isRequired,
    loadingFalse: PropTypes.func.isRequired,
    saveEditorContent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftEditor);