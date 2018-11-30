import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadingTrue, loadingFalse } from '../../redux/isLoading';
import * as imgurAPI from '../../fetch/imgurAPI';
import { errorLog } from '../../Utils/console';

import 'react-quill/dist/quill.snow.css';
import './quillEditorStyle.css';

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
}, dispatch));
class QuillEditor extends Component {
    constructor() {
        super();
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill');
        }
        this.state = {
            customBtnsHasCreated: false,
            customResetBtnHasCreated: false,
            content: ''
        };
        this.editModule = {
            toolbar: [
                ['bold','image', 'link', 'clean'],
                ['reset']
            ]
        };
        this.editModuleWithoutImage = {
            toolbar: [['bold', 'link', 'clean']]
        };
        this.reactQuillRef = null;
        this.quillRef = null;
        this.imageInputButton = null;
    }
    componentDidMount () {
        this.fetchContent(this.props.content);
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.content !== this.props.content) {
            this.fetchContent(this.props.content);
        }
        this.attachQuillRefs();
    }
    fetchContent (html) {
        this.setState({content: html});
    }
    attachQuillRefs () {
        if (!this.reactQuillRef) return;
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
        // if (!this.state.previewBtnHasCreated) {
        //     this.createPreviewBtn();
        // }
        if (!this.state.customBtnsHasCreated) {
            this.activateCustomBtn();
        }
        // if (!this.state.customImgBtnHasCreated) {
        //     this.createCustomImageBtn();
        // }
        // this.setState({isAttachedQuillRefs: true});
    }
    // createPreviewBtn () {
    //     const toolbar = this.quillRef.getModule('toolbar');
    //     toolbar.addHandler('preview');
    //     const targetEditor = document.querySelector(`#${this.props.id}`);
    //     const previewBtn = targetEditor.querySelector('.ql-preview');
    //     this.setState({previewBtnHasCreated: true});
    //     previewBtn.addEventListener('click', () => this.handlePreview(targetEditor, previewBtn));
    // }
    // handlePreview (targetEditor, previewBtn) {
    //     if (this.state.showPreview) {
    //         this.setState({showPreview: false});
    //         targetEditor.querySelector('.ql-container').style.height = this.props.isSmallDevice ? "136px" : this.props.contentMaxHeight;
    //         previewBtn.removeAttribute("style");
    //         this.quillRef.enable(true); // 切換成繼續編輯
    //     } else {
    //         this.setState({showPreview: true});
    //         targetEditor.querySelector('.ql-container').style.height = "auto";
    //         previewBtn.style.color = "#06c";
    //         this.quillRef.enable(false); // 切換成預覽
    //     }
    // }
    activateCustomBtn () {
        this.createResetBtn();
        this.setState({customBtnsHasCreated: true});
    }
    createResetBtn () {
        // const toolbar = this.quillRef.getModule('toolbar');
        const resetButton = document.querySelector('.ql-reset');
        resetButton.addEventListener('click', () => this.resetContent());
    }
    removeResetBtn () {
        const resetButton = document.querySelector('.ql-reset');
        resetButton.removeEventListener('click', () => this.resetContent());
    }
    resetContent () {
        this.setState({content: ''});
    }
    // createCustomImageBtn () {
    //     const toolbar = this.quillRef.getModule('toolbar');
    //     // this.setState({customImgBtnHasCreated: true});

    //     toolbar.addHandler('image', () => this.onClickImageUploadButton());
    // }
    onClickImageUploadButton () {
        if (this.imageInputButton) {
            const imageUploadBtn = this.imageInputButton;
            imageUploadBtn.click();
        };
    }
    imageUploadHandler (evt) {
        if (evt.target.files && evt.target.files[0]) {
            this.props.loadingTrue();
            const imgForUpload = evt.target.files[0];
            if (/^image\//i.test(imgForUpload.type)) {
                imgurAPI
                    .uploadImgur(imgForUpload)
                    .then((imgurRes) => { 
                        // console.log('imgurRes', imgurRes);
                        const imgLink = imgurRes.data.data.link;
                        const range = this.quillRef.getSelection();
                        this.quillRef.insertEmbed(range.index, 'image', imgLink);
                        this.props.loadingFalse();
                    })
                    .catch(err => {
                        errorLog('imgurAPI.uploadImgur, error: ', err.message);
                        this.props.loadingFalse();
                    });
            } else {
                alert('只能上傳圖片喲');
                this.props.loadingFalse();
            };
        };
    }
    onChangeEditor (html, delta, source, editor) {
        // console.log('onChangeEditor');
        this.setState({content: html});
        this.props.changeContentHandler(html);
    }
    // componentWillUnmount () {
    //     if (document.querySelector(`#${this.props.id}`)) {
    //         // const targetEditor = document.querySelector(`#${this.props.id}`);
    //         // const previewBtn = targetEditor.querySelector('.ql-preview');
    //         // previewBtn.removeEventListener('click', () => this.handlePreview());
    //         const imgUploadInput = document.querySelector("#imgUploadInput-id");
    //         imgUploadInput.removeEventListener("change", (evt) => this.onChangeImage(evt));
    //     }
    // }
    componentWillUnmount () {
        this.removeResetBtn();
    }
    render () {
        const ReactQuill = this.ReactQuill;
        const modules = this.props.enableUploadImg ? this.editModule : this.editModuleWithoutImage;
        if (typeof window !== 'undefined') {
            return (
                <div id="editor_wrapper_edit">
                    <ReactQuill
                        theme="snow"
                        ref={(quill) => this.reactQuillRef = quill}
                        value={this.state.content}
                        onChange={(html) => this.onChangeEditor(html)}
                        placeholder={this.props.placeholder}
                        modules={modules}
                        bounds="#editor_wrapper_edit"
                    />
                    <input
                        ref={node => this.imageInputButton = node}
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        onChange={(evt) => this.imageUploadHandler(evt)}
                    />
                </div>
            );
        } else {
            return <textarea />;
        }
    }

}
QuillEditor.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSmallDevice: PropTypes.bool.isRequired,
    loadingTrue: PropTypes.func.isRequired,
    loadingFalse: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    enableUploadImg: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    changeContentHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuillEditor);