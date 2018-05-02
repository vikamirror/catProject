import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showDialog } from '../../../redux/dialog';

const mapStateToProps = state => ({ 
    dialog: state.dialog,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    showDialog: showDialog,
}, dispatch));
class Age extends Component {
    setAge (e) {
        const inputAge = e.target.value;
        if (inputAge) {
            this.props.handleState('age', inputAge);
        } else {
            this.props.showDialog({
                type: 'warning',
                title: '年齡為必填喲',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: "知道了",
                modalVerticalAlign: "middle"
            });
            findDOMNode(this.refs.input_age).focus();
        }
    }
    render () {
        const {isEdit, age} = this.props;
        if (isEdit) {
            return (
                <div className="row">
                    <label className="col-xs-4" htmlFor="">年齡</label>
                    <div className="col-xs-7 group-input">
                        <input
                            ref="input_age"
                            className="edit"
                            type="text" 
                            placeholder="ex: 3歲"
                            maxLength={20}
                            defaultValue={age || ''}
                            onBlur={e => this.setAge(e)}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <label className="col-xs-4" htmlFor="">年齡</label>
                    <div className="col-xs-7 group-info text">{age}</div>
                </div>
            );
        }
    }
}

Age.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    age: PropTypes.string.isRequired,
    handleState: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Age);