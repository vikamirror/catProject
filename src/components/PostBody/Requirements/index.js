import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import { removeHTMLTag } from '../../../Utils/stringFormat';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import { CheckBox } from '../../FormInputs';
// import { inputPost } from '../../../redux/post';
import OnBlurListener from '../../OnBlurListener';

import './requirements.css';

class Requirements extends Component {
    constructor () {
        super();
        this.state = {
            requirements: []
        };
    }
    componentDidMount () {
        this.setState({requirements: [...this.props.requirements]});
    }
    setRequirementCheck (index, bool) {
        const copyRequirements = [...this.state.requirements];
        copyRequirements[index].value = bool;
        // ex: newRequirements[3].value = true;
        this.setState({requirements: copyRequirements});
    }
    setRemark () {
        const htmlString = findDOMNode(this.refs.input_remark).innerHTML;
        const remark = htmlString.replace(/(style="[^>]+)|(class="[^>]+)/g, ''); // 拿掉任何style, class
        this.props.handleState('remark',remark);
    }
    completeRequirements () {
        const copyRequirements = [...this.state.requirements];
        this.props.handleState('requirements', copyRequirements);
    }
    render () {
        const { isEdit, requirements, remark } = this.props;
        if (isEdit) {
            return (
                <OnBlurListener 
                        inactiveFocus={() => this.completeRequirements()} 
                        activeFocus={() => {}}>
                    <div className="row">
                        <label className="col-xs-4 col-sm-4" htmlFor="">認養條件</label>
                        <div className="col-xs-12 col-sm-8 group-input">
                            {       
                                requirements.map((requirement, index) => (
                                    <CheckBox 
                                        key={index}
                                        id={requirement.name}
                                        name={requirement.name}
                                        isChecked={requirement.value === true}
                                        label={requirement.desc}
                                        onChangeHandler={(bool) => this.setRequirementCheck(index, bool)}
                                    />
                                ))
                            }
                        </div>
                        <div className="col-xs-12 group-input">
                            <div
                                ref="input_remark"
                                className="textarea edit"
                                placeholder="其它認養條件..."
                                contentEditable="true"
                                dangerouslySetInnerHTML={{ __html: remark}} 
                                onBlur={() => this.setRemark()}
                            />
                        </div>
                    </div>
                </OnBlurListener>
            );
        } else {
            return (
                <div>
                    <div className="row">
                        <label className="col-xs-4 col-sm-4" htmlFor="">認養條件</label>
                        <div className="col-xs-12 col-sm-8 group-info">
                            {
                                requirements.map((requirement, index) => {
                                    return requirement.value === true ?
                                    <div key={index} className="row">
                                        <div className="col-xs-1 check">
                                            <div className="icon-btn font-red-wine"><i className="icon icon-check" /></div>
                                        </div>
                                        <div className="col-xs-11 text">{requirement.desc}</div>
                                    </div>
                                    :
                                    ''
                                })
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 group-info">        
                            <div className="col-xs-11 col-sm-11 text">{removeHTMLTag(remark)}</div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
Requirements.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    requirements: PropTypes.array.isRequired,
    remark: PropTypes.string.isRequired,
    handleState: PropTypes.func
};
export default Requirements;