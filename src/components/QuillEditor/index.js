import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import tinymce from 'tinymce';
import { loadingTrue, loadingFalse } from '../../redux/isLoading';
import * as imgurAPI from '../../fetch/imgurAPI';

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
            // content: '',
            previewBtnHasCreated: false,
            customImgBtnHasCreated: false,
            showPreview: false,
        };
        this.editModule = {
            toolbar: [['bold','image', 'link', 'clean'], ['preview']]
        };
        this.editModuleWithoutImage = {
            toolbar: [['bold', 'link', 'clean'], ['preview']]
        };
        this.readOnlyModule = {
            toolbar: false,
        };
        this.reactQuillRef = null;
        this.quillRef = null;
    }
    componentDidMount () {
        this.fetchContent(this.props.content);
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.content !== this.props.content) {
            this.fetchContent(nextProps.content);
        }
    }
    fetchContent (html) {
        this.setState({content: html});
    }
    componentDidUpdate () {
        if (this.props.isEdit) {
            this.attachQuillRefs();
        }
    }
    attachQuillRefs () {
        if (!this.reactQuillRef) return;
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
        if (!this.state.previewBtnHasCreated) {
            this.createPreviewBtn();
        }
        if (!this.state.customImgBtnHasCreated) {
            this.createCustomImageBtn();
        }
    }
    createPreviewBtn () {
        const toolbar = this.quillRef.getModule('toolbar');
        toolbar.addHandler('preview');
        const targetEditor = document.querySelector(`#${this.props.id}`);
        const previewBtn = targetEditor.querySelector('.ql-preview');
        this.setState({previewBtnHasCreated: true});

        previewBtn.addEventListener('click', () => this.handlePreview(targetEditor, previewBtn));
    }
    handlePreview (targetEditor, previewBtn) {
        if (this.state.showPreview) {
            this.setState({showPreview: false});
            targetEditor.querySelector('.ql-container').style.height = this.props.isSmallDevice ? "136px" : this.props.contentMaxHeight;
            previewBtn.removeAttribute("style");
            this.quillRef.enable(true); // 切換成繼續編輯
        } else {
            this.setState({showPreview: true});
            targetEditor.querySelector('.ql-container').style.height = "auto";
            previewBtn.style.color = "#06c";
            this.quillRef.enable(false); // 切換成預覽
        }
    }
    createCustomImageBtn () {
        const toolbar = this.quillRef.getModule('toolbar');
        this.setState({customImgBtnHasCreated: true});

        toolbar.addHandler('image', () => this.handleImgUpload());
    }
    handleImgUpload () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('capture', 'camera');
        input.setAttribute('accept', 'image/*');
        input.click();
        this.props.loadingTrue();
        input.onchange = () => {
            const imgForUpload = input.files[0];
            if (/^image\//.test(imgForUpload.type)) {
                console.log('imgForUpload', imgForUpload)
                imgurAPI
                    .uploadImgur(imgForUpload)
                    .then((imgurRes) => { 
                        console.log('imgurRes', imgurRes);
                        const imgLink = imgurRes.data.data.link;
                        const range = this.quillRef.getSelection();
                        this.quillRef.insertEmbed(range.index, 'image', imgLink);
                        this.props.loadingFalse();
                    })
                    .catch(err => {
                        console.log('imgurAPI.uploadImgur, error: ', err.message);
                        this.props.loadingFalse();
                    });
            } else {
                console.warn('你只能上傳圖片');
            }
        };
    }
    onChangeEditor (html) {
       //  this.setState({ content: html });
       if (this.props.isEdit) {
            this.props.saveEditorContent(html);
       }
    }
    componentWillUnmount () {
        if (document.querySelector(`#${this.props.id}`)) {
            const targetEditor = document.querySelector(`#${this.props.id}`);
            const previewBtn = targetEditor.querySelector('.ql-preview');
            previewBtn.removeEventListener('click', () => this.handlePreview());
        }
    }
    onBlurEditor () {
        // console.log('this.state.content:', this.state.content);
        this.props.saveEditorContent(this.state.content);
    }
    render () {
        const ReactQuill = this.ReactQuill;
        const modules = this.props.enableUploadImg ? this.editModule : this.editModuleWithoutImage;
        if (typeof window !== 'undefined') {
            if (this.props.isEdit) {
                return (
                    <div className="editor_wrapper_edit">
                        <ReactQuill
                            theme="snow"
                            id={this.props.id}
                            ref={(quill) => { this.reactQuillRef = quill }}
                            // value={this.state.content}
                            value={this.props.content}
                            onChange={(html) => this.onChangeEditor(html)}
                            // onBlur={() => this.onBlurEditor()}
                            placeholder={this.props.placeholder}
                            modules={modules}
                        />
                    </div>
                );
            } else {
                return (
                    <div className="editor_wrapper_readOnly">
                        <ReactQuill
                            theme="snow"
                            // value={this.state.content}
                            value={this.props.content}
                            placeholder={this.props.placeholder}
                            modules={this.readOnlyModule}
                            readOnly={true}
                        />
                    </div>
                );
            }
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
    id: PropTypes.string,
    content: PropTypes.string.isRequired,
    contentMaxHeight: PropTypes.string,
    isEdit: PropTypes.bool.isRequired,
    enableUploadImg: PropTypes.bool.isRequired,
    placeholder: PropTypes.string,
    saveEditorContent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuillEditor);