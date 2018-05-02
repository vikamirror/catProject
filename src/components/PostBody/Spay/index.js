import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import { CheckBox } from '../../FormInputs';

const Spay = ({ isEdit, isSpay, handleState }) => {
    if (isEdit) {
        return (
            <div className="row">
                <label className="col-xs-4" htmlFor="">是否結紮</label>
                <div className="col-xs-7 group-input">
                    <CheckBox 
                        id='isSpay'
                        name='isSpay'
                        isChecked={isSpay === true}
                        label='是'
                        onChangeHandler={isSpay => handleState('isSpay', isSpay)}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="row">
                <label className="col-xs-4" htmlFor="">是否結紮</label>
                <div className="col-xs-7 group-info text">{isSpay === true ? '是' : '否'}</div>
            </div>
        );
    } 
}

Spay.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    isSpay: PropTypes.bool.isRequired,
    handleState: PropTypes.func,
};
export default Spay;