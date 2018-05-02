import React from 'react';
// import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../Avatar';
import PropTypes from 'prop-types';

import './leaveMsg.css';

const mapStateToProps = state => ({member: state.member});
const mapDispatchToProps = dispatch => (bindActionCreators({ }, dispatch));
const LeaveMsg = ({member, openMsgDialog, postAuthor}) => (
    <div className="leave-msg-wrapper bg-ghostWhite u-margin-t-8">
        <div className="postReply_inner-padding">
            <Avatar avatarUrl={member.avatar} />
            <div className="message-content form">                  
                <div
                    className="textarea edit"
                    placeholder="請輸入留言......"
                    contentEditable="false"
                    dangerouslySetInnerHTML={{ __html: ''}}
                    onClick={() => openMsgDialog(`${postAuthor.name}(原po)`)}
                />
            </div>
        </div>
    </div>
);

LeaveMsg.propTypes = {
    member: PropTypes.object.isRequired,
    postAuthor: PropTypes.object.isRequired,
    openMsgDialog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveMsg);