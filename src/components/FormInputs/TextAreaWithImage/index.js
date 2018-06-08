import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
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
import './textAreaWithImage.css';

const imagePlugin = createImagePlugin();
const linkifyPlugin = createLinkifyPlugin();
const plugins = [imagePlugin, linkifyPlugin];

const ImgUploadBtn = ({imgUploadBtnPositionTop, onChangeHandler, isEditing}) => {
    let opacityValue = isEditing ? 1 : 0;
    return (
        <div className="position-control__tooltip" style={{top: imgUploadBtnPositionTop, opacity: opacityValue, transition: 'opacity 0.2s'}}>
            <div className="tooltip">
                <div className="img-upload-btn u-push-right">
                    <button className="btn button-circle circle">
                        <div className="icon-btn"><i className="icon icon-picture" /></div>
                    </button>
                    <input type="file" capture="camera" accept="image/*"
                        onChange={(imgEvt) => onChangeHandler(imgEvt)}
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

class TextAreaWithImage extends Component {
    constructor () {
        super();
        this.state = {
            isEditing: false,
            enableUploadImg: false,
            imgUploadBtnPositionTop: 8,
            editorState: EditorState.createEmpty(),
        };
    }
    changeHandler (editorState) {
        this.setState({editorState: editorState});
        if (document.getElementById("draft-wrapper")) {
            let distanceFromClientTop = document.getElementById("draft-wrapper").getBoundingClientRect().top;
            // console.log('distanceFromClientTop:', distanceFromClientTop);
            if (distanceFromClientTop < 56) {
                this.setState({imgUploadBtnPositionTop: 56 - distanceFromClientTop + 16});
            } else {
                this.setState({imgUploadBtnPositionTop: 8});
            }
        }
    }
    focusHandler (e) {
        this.editor.focus();
        this.setState({isEditing: true});
    }
    onBlurHandler() {
        this.setState({isEditing: false});
        this.saveContent();
    }
    imgUploadHandler (imgEvt) {
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
    saveContent () {
        const contentState = this.state.editorState.getCurrentContent();
        const stringifyContent = JSON.stringify(convertToRaw(contentState));
        
        // console.log('content:', JSON.stringify({content: content}));
        this.props.setContentHandler(stringifyContent);
    }
    render () {
        return (
            <div>
                <div className="u-clearfix">
                    <label className="font-weight-5 u-push-left" htmlFor="img-upload-btn-charactor">{this.props.label}</label>
                </div>
                <div id="draft-wrapper">
                    <div className="editor" onClick={(e) => this.focusHandler(e)} onBlur={() => this.onBlurHandler()}>
                        <Editor
                            editorState={this.state.editorState}
                            plugins={plugins}
                            onChange={(editorState) => this.changeHandler(editorState)}
                            ref={(element) => { this.editor = element; }}
                        />
                        <ImgUploadBtn 
                            imgUploadBtnPositionTop={this.state.imgUploadBtnPositionTop} 
                            onChangeHandler={(imgEvt) => this.imgUploadHandler(imgEvt)}
                            isEditing={this.state.isEditing} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

TextAreaWithImage.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    loadingTrue: PropTypes.func.isRequired,
    loadingFalse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaWithImage);