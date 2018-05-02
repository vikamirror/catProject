import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showDialog } from '../../../redux/dialog';
// import { inputPost } from '../../../redux/post';

const mapStateToProps = state => ({ 
    dialog: state.dialog,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    showDialog: showDialog,
}, dispatch));

class Title extends Component {
    checkTitle (evt) {
        const inputTitle = evt.target.value;
        if (inputTitle.length > 20) {
            this.props.showDialog({
                type: 'warning',
                title: '標題不得超過20字',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: "知道了",
                modalVerticalAlign: "middle"
            });
            findDOMNode(this.refs.input_title).value = inputTitle.substring(0, 20);
            findDOMNode(this.refs.input_title).focus();
        }
        else if (inputTitle.length === 0) {
            this.props.showDialog({
                type: 'warning',
                title: '請輸入標題',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: "知道了",
                modalVerticalAlign: "middle"
            });
        } 
        else {
            this.props.handleState('title', inputTitle);
        }
    }
    render () {
        const { isEdit, title } = this.props;
        if (isEdit) {
            return (
                <input
                    ref="input_title"
                    className="title edit font-size-24 line-height-48"
                    type="text" 
                    placeholder="標題"
                    maxLength={20}
                    defaultValue={title || ''}
                    onBlur={ (evt) => this.checkTitle(evt) }
                />
            )
        } else {
            return <div className="title font-size-24 line-height-48">{title}</div>;
        }
    }
}

Title.proptypes = {
    isEdit: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    handleState: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);