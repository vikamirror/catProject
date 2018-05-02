import React from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../../../Utils/timeFormat'
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import Avatar from '../../Avatar';

import './dateAndAuthor.css';

const DateAndAuthor = ({author, isEdit, dateAdded, lastModify}) => {
    if (isEdit) {
        return '';
    } else {
        return (
            <div className="author_date u-padding-b-8">
                <Avatar avatarUrl={author.avatar} />
                <div className="info">
                    <span className="font-size-18 font-weight-6 name">{author.name}</span>
                    <div className="date font-lightGrey">
                        <span>發文日期:{formatDateTime(dateAdded)}</span>
                        <span>{lastModify !== dateAdded ? lastModify : ''}</span>
                    </div>
                </div>
            </div>
        );
    }
}

DateAndAuthor.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    author: PropTypes.object.isRequired,
    dateAdded: PropTypes.any,
    lastModify: PropTypes.any
};
export default DateAndAuthor;