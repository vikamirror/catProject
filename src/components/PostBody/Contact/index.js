import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeContact, changeContactInfo } from '../../../redux/post';

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => (bindActionCreators({
    changeContact: changeContact,
    changeContactInfo: changeContactInfo,
}, dispatch));
class Contact extends Component {
    setContact (e) {
        const inputContact = e.target.value;
        // this.props.handleState('contact', inputContact);
        this.props.changeContact(inputContact);
    }
    setInfo (e) {
        const inputContactInfo = e.target.value;
        // this.props.handleState('contactInfo', inputContactInfo);
        this.props.changeContactInfo(inputContactInfo);
    }
    render () {
        const {isEdit, contact, contactInfo} = this.props;
        if (isEdit) {
            return (
                <div>
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">聯絡人</label>
                        <div className="col-xs-7 group-input">
                            <input
                                ref="input_contact"
                                className="edit"
                                type="text" 
                                placeholder="ex: 林小姐"
                                maxLength={40}
                                defaultValue={contact || ''}
                                onBlur={ (e) => this.setContact(e) }
                            />
                        </div>
                    </div>
                    <hr className="hr-line-style1" />
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">聯絡資料</label>
                        <div className="col-xs-7 group-input">
                            <input
                                ref="input_phone_number"
                                className="edit"
                                type="text" 
                                placeholder="ex: 手機: 0912345678"
                                maxLength={30}
                                defaultValue={contactInfo || ''}
                                onBlur={ (e) => this.setInfo(e) }
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">聯絡人</label>
                        <div className="col-xs-7 group-info text">{contact}</div>
                    </div>
                    <div className="row">
                        <label className="col-xs-4" htmlFor="">聯絡資料</label>
                        <div className="col-xs-7 group-info text">{contactInfo}</div>
                    </div>
                </div>
            );
        }
    }
}

Contact.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    contact: PropTypes.string.isRequired,
    contactInfo: PropTypes.string.isRequired,
    changeContact: PropTypes.func.isRequired,
    changeContactInfo: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Contact);