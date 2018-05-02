import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import { RadioButton } from '../../FormInputs';

class Gender extends Component {
    setGender (evt) {
        // this.props.inputPost({
        //     ...this.props.post,
        //     gender: evt.target.value //只更新gender的部分
        // });
        this.props.handleState('gender', evt.target.value);
    }
    render () {
        const {isEdit, gender} = this.props;
        if (isEdit) {
            return (
                <div className="row">
                    <label className="col-xs-4" htmlFor="">性別</label>
                    <div className="group-input col-xs-7">                                                    
                        <RadioButton 
                            id='male'
                            name='gender'
                            value='1'
                            isChecked={gender === '1'}
                            label='男'
                            onChangeHandler={(evt) => this.setGender(evt)}
                        />
                        <RadioButton 
                            id='female'
                            name='gender'
                            value='0'
                            isChecked={gender === '0'}
                            label='女'
                            onChangeHandler={(evt) => this.setGender(evt)}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <label className="col-xs-4" htmlFor="">性別</label>
                    <div className="col-xs-7 group-info text">{gender === '1' ? '男' : '女'}</div>
                </div>
            );
        }
    }
}

Gender.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    gender: PropTypes.string.isRequired,
    handleState: PropTypes.func,
};
export default Gender;