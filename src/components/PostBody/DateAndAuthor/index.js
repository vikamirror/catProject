import React from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../../../Utils/timeFormat'
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import Avatar from '../../Avatar';

import './dateAndAuthor.css';

// const mapStateToProps = state => ({ });
// const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const DateAndAuthor = ({isEdit, author, dateAdded, lastModify}) => {
    if (isEdit) {
        return '';
    } else {
        return (
            <div className="author_date u-padding-b-8">
                <Avatar avatarUrl={author.avatar} />
                <div className="info">
                    <span className="font-size-16 font-weight-6 name">{author.name}</span>
                    <div className="date font-lightGrey">
                        <span className="u-margin-r-16">發文日期: {formatDateTime(dateAdded)}</span>
                        {
                            lastModify !== dateAdded ?
                                <span className="u-margin-r-16">{`更新日期: ${formatDateTime(lastModify)}`}</span> : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

DateAndAuthor.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    author: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    dateAdded: PropTypes.any,
    lastModify: PropTypes.any
};
// export default connect(mapStateToProps, mapDispatchToProps)(DateAndAuthor);
export default DateAndAuthor;
