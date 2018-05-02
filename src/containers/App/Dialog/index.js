import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { convertFromStringToDom } from '../../../Utils/stringFormat';
import { closeDialog } from '../../../redux/dialog';

import './dialog.css';

const Icon = ({type}) => {
    switch (type) {
        case 'question':
            return <div className="u-margin-b-8"><img src="./images/question.png" alt="" /></div>;
        case 'warning':
            return <div className="u-margin-b-8"><img src="./images/alert.png" alt="" /></div>;
        default:
            return '';
    }
}

const mapStateToProps = state => ({ dialog: state.dialog });
const mapDispatchToProps = dispatch => (bindActionCreators({
    closeDialog: closeDialog
 }, dispatch));
class Dialog extends Component {
    constructor () {
        super();
        this.state = {
            inputValue: '',
            // receivedHtmlString: ''
        };
    }
    componentDidUpdate () {
        if (this.props.dialog.htmlString) {
            if (!findDOMNode(this.refs.ref_htmlString).firstChild) {
                findDOMNode(this.refs.ref_htmlString).appendChild(convertFromStringToDom(this.props.dialog.htmlString));
            }
        }
    }
    handleState (state, evt) {
        this.setState({[state]: evt.target.value});
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
        const modalVerticalAlignStyle = modalVerticalAlign === 'middle' ? 'u-vertical-center' : '';
        if (!isShow) {
            return ''
        };
        return (
            <div className="u-wrapper-fixed-w100-h100 z-index-100 u-div-outline-0" id="dialog_wrapper">
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
                            onChange={(evt) => this.handleState('inputValue', evt)}>
                        </textarea> : ''
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
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);