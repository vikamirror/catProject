import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { post_header, showInitialHeader } from '../../../redux/header';
import { rollBackPost } from '../../../redux/post';

import './postHeader.css';

const mapStateToProps = state => ({
    header: state.header,
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    rollBackPost: rollBackPost,
    showInitialHeader: showInitialHeader,
}, dispatch));
const PostHeader = ({header, post, shoudHeaderColored, rollBackPost, history}) => {
    if (header !== post_header) {
        return '';
    };
    const handleClose = (e) => {
        if (post.cuid && post.isEdit) {
            rollBackPost();
        } else {
            e.stopPropagation();
            history.goBack();
        };
    }
    // const shadowedHeader = shoudHeaderColored ? "shadow-header" : "";
    return (
        <header className={`header post-header shadow-header z-index-1`}>
            <div className="container">
                <nav className="nav">
                    <div className="close-button u-div-center z-index-1 u-clearfix" onClick={(e) => handleClose(e)}>
                        <div className="closeCross u-push-right">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};
PostHeader.propTypes = {
    header: PropTypes.string.isRequired,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostHeader));