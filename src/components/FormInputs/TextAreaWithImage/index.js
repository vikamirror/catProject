import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as imgurAPI from '../../../fetch/imgurAPI';
import { loadingTrue, loadingFalse } from '../../../redux/isLoading';

import './textAreaWithImage.css';

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
            inlineControlTop: 0
        };
    }
    componentDidMount () {
        this.onListenFileInput();
    }
    onListenFileInput () {
        const imgUploadNode = findDOMNode(this.refs.img_upload);
        imgUploadNode.addEventListener("change", () => {
            if (imgUploadNode.files && imgUploadNode.files[0]) {
                // console.log(imgUploadNode.files[0]);
                this.props.loadingTrue();
                imgurAPI.uploadImgur(imgUploadNode.files[0])
                        .then((res) => { 
                            const domImg = document.createElement("img"); 
                            domImg.src = res.data.data.link;
                            findDOMNode(this.refs.div_textAreaWithImage).appendChild(domImg);
                            this.props.loadingFalse();
                            setTimeout(() => {
                                const domBr1 = document.createElement("br");
                                const domBr2 = document.createElement("br");
                                findDOMNode(this.refs.div_textAreaWithImage).appendChild(domBr1);
                                findDOMNode(this.refs.div_textAreaWithImage).appendChild(domBr2);
                            },1000);
                        })
                        .catch(err => {
                            console.log('imgurAPI.uploadImgur, error: ', err.message);
                            this.props.loadingFalse();
                        });
            }
        });
    }
    onChangeInput () {
        const textareaHeight = findDOMNode(this.refs.div_textAreaWithImage).clientHeight;
        // const tooltipTopPosition = textareaNode.childElementCount * 32;
        this.setState({inlineControlTop: textareaHeight});
    }
    setContent (evt) {
        const htmlString = this.refs.div_textAreaWithImage.innerHTML;
        // console.log('htmlString:',htmlString);
        //const content = htmlString.replace(/<[^>]+>/g, '');
        // /<img[^\>]+\>/g 只捕捉 img標籤的部分
        const content = htmlString.replace(/(style="[^>]+)|(class="[^>]+)/g, ''); // 拿掉任何style, class
        console.log('content:', content);
        this.props.setContentHandler(content);
    }
    render () {
        return (
            <div>
                <div className="u-clearfix">
                    <label className="font-weight-5 u-push-left" htmlFor="img-upload-btn-charactor">{this.props.label}</label>
                </div>
                <div
                    ref="div_textAreaWithImage"
                    className="textarea edit"
                    placeholder={this.props.placeholder}
                    contentEditable="true"
                    dangerouslySetInnerHTML={{ __html:this.props.defaultContent}}
                    onInput={ () => this.onChangeInput() }
                    onBlur={ (evt) => this.setContent(evt) }
                />
                <div className="inline-control" style={{top: this.state.inlineControlTop}}>
                    <div className="tooltip">
                        <div className="img-upload-btn u-push-right" id="img-upload-btn-charactor">
                            <button className="btn">
                                <div className="icon-btn"><i className="icon icon-picture" /></div>
                            </button>
                            <input type="file" ref="img_upload" />
                        </div>
                        <span className="tooltiptext">插入圖片</span>
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