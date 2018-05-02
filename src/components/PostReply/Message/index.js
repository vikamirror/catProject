import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../Avatar';
import { timeFromNow } from '../../../Utils/timeFormat';

import './message.css';

const Message = ({message, isLastMessage, openMsgDialog}) => (
    <div className="message-wrapper">
        <div className="postReply_inner-padding u-padding-b-0">
            <Avatar avatarUrl={message.member.avatar} />
            <div className="message-content">
                <div className="member">
                    <div className="font-size-18 font-weight-6 u-padding-r-16">{message.member.name}</div>
                    <div className="font-size-14 font-lightGrey">
                        {timeFromNow(message.dateAdded)}
                    </div>
                </div>
                <div className="reply-to font-size-16 font-blue">
                    <label className="label">回覆給</label>
                    <span className="tag font-size-14">@{message.tag}</span>
                </div>
                <div className="font-size-16 message u-margin-b-8">{message.message}</div>
                <span className="reply-btn">
                    <div className="icon-btn font-size-16 line-height-32"><i className="icon icon-comment" /></div>
                    <span className="font-size-16" onClick={() => openMsgDialog(message.member.name)}>回覆</span>
                </span>
            </div>
        </div>
    </div>
);

Message.propTypes = {
    message: PropTypes.object.isRequired,
    openMsgDialog: PropTypes.func.isRequired,
};

export default Message;