import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BounceInUp from '../../../components/BounceInUp';
import { convertFromStringToDom } from '../../../Utils/stringFormat';
import { closeDialog } from '../../../redux/dialog';
import { baseUrl } from '../../../Utils/stringFormat';
import QuillEditor from '../../../components/QuillEditor';

import './dialog.css';

const Icon = ({type}) => {
    switch (type) {
        case 'question':
            return <div className="u-margin-b-8"><img src={`${baseUrl}/images/question.png`} alt="" /></div>;
        case 'warning':
            return <div className="u-margin-b-8"><img src={`${baseUrl}/images/alert.png`} alt="" /></div>;
        default:
            return '';
    }
};

const mapStateToProps = state => ({ dialog: state.dialog });
const mapDispatchToProps = dispatch => (bindActionCreators({
    closeDialog: closeDialog
}, dispatch));
class Dialog extends Component {
    constructor () {
        super();
        this.state = {
            inputValue: '',
            shouldBounceInUp: false,
        };
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.dialog.htmlString) {
            if (!findDOMNode(this.refs.ref_htmlString).firstChild) {
                findDOMNode(this.refs.ref_htmlString).appendChild(convertFromStringToDom(this.props.dialog.htmlString));
            }
        }
        if (prevProps.dialog.isShow !== this.props.dialog.isShow) {
            setTimeout(() => {
                this.setState({shouldBounceInUp: this.props.dialog.isShow});
            }, 100);
        }
    }
    handleState (state, content) {
        this.setState({[state]: content});
    }
    confirmBtn () {
        if (this.props.dialog.onClickConfirmButton) {
            let confirmValue = this.state.inputValue.trim().length === 0 ? {confirm: true} : {confirm: true, inputValue: this.state.inputValue};
            this.props.dialog.onClickConfirmButton(confirmValue);
        }
        this.props.closeDialog();
        this.setState({inputValue: ''});
    }
    cancelBtn () {
        this.setState({inputValue: ''});
        if (this.props.dialog.onClickCancelButton) {
            this.props.dialog.onClickCancelButton();
        } else {
            this.props.closeDialog();
        }
    }
    render () {
        const {
            isShow,
            type, 
            title,
            inputPlaceholder,
            showCancelButton,
            cancelButtonText,
            showConfirmButton,
            confirmButtonText,
            buttonsAlign,
            modalVerticalAlign,
        } = this.props.dialog;
        const {
            content,
            enableUploadImg,
        } = this.props.dialog.textEditor;
        const modalVerticalAlignStyle = modalVerticalAlign === 'middle' ? 'u-vertical-center' : '';
        if (!isShow) {
            return '';
        }
        return (         
            <div className="u-wrapper-fixed-w100-h100 z-index-99 u-div-outline-0" id="dialog-wrapper"> 
                <BounceInUp inCondition={this.state.shouldBounceInUp} enterMilliseconds={300}>     
                    <div className={`modal u-div-center u-text-center form ${modalVerticalAlignStyle}`}>
                        <div className="font-size-18 u-margin-b-8">{title}</div>
                        <Icon type={type} />
                        <div ref="ref_htmlString"></div>
                        {
                            type === 'textarea' ?
                            <textarea 
                                className="textarea"
                                placeholder={inputPlaceholder}
                                value={this.state.inputValue}
                                onChange={(evt) => this.handleState('inputValue', evt.target.value)}>
                            </textarea> : ''
                        }
                        {
                            type === 'textEditor' ?
                            <QuillEditor
                                content={content}
                                enableUploadImg={enableUploadImg}
                                placeholder={inputPlaceholder}
                                changeContentHandler={content => this.handleState('inputValue', content)}
                            /> : ''
                        }
                        <div className="btn-group u-margin-t-8" style={{textAlign: buttonsAlign}}>
                            {
                                showCancelButton ?
                                <div className="btn btn-sm btn-cancel" onClick={() => this.cancelBtn()}>{cancelButtonText}</div> : ''
                            }
                            {
                                showConfirmButton ?
                                <div className="btn btn-sm btn-secondary" onClick={() => this.confirmBtn()}>{confirmButtonText}</div> : ''
                            }
                        </div>
                    </div>
                </BounceInUp>  
            </div> 
        );
    }
}

Dialog.propTypes = {
    dialog: PropTypes.shape({
        isShow: PropTypes.bool.isRequired,
        type: PropTypes.string,
        title: PropTypes.string.isRequired,
        inputPlaceholder: PropTypes.string,
        showCancelButton: PropTypes.bool.isRequired,
        cancelButtonText: PropTypes.string.isRequired,
        showConfirmButton: PropTypes.bool.isRequired,
        confirmButtonText: PropTypes.string.isRequired,
        buttonsAlign: PropTypes.string.isRequired,
        modalVerticalAlign: PropTypes.string,
    }),
    closeDialog: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
