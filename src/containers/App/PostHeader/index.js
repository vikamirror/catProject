import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { post_header } from '../../../redux/header';
import { rollBackPost } from '../../../redux/post';
import { showDialog } from '../../../redux/dialog';

import './postHeader.css';

const mapStateToProps = state => ({
    header: state.header,
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    rollBackPost: rollBackPost,
    showDialog,
}, dispatch));
const PostHeader = ({header, post, shoudHeaderColored, rollBackPost, history, location, showDialog}) => {
    if (header !== post_header) {
        return '';
    };
    const handleClose = (e) => {
        if (location.pathname === "/myPosts/newPost") {
            // create post
            showDialog({
                type: 'question',
                title: '放棄編輯回到上一頁？',
                showCancelButton: true,
                cancelButtonText: "取消",
                showConfirmButton: true,
                confirmButtonText: "確定",
                onClickConfirmButton: (confirmValue) => {
                    if (confirmValue.confirm) {
                        history.goBack();
                    };
                },
                buttonsAlign: "center",
            });
        } else if (post.isEdit) {
            // update post
            showDialog({
                type: 'question',
                title: '放棄編輯？',
                showCancelButton: true,
                cancelButtonText: "取消",
                showConfirmButton: true,
                confirmButtonText: "確定",
                onClickConfirmButton: (confirmValue) => {
                    if (confirmValue.confirm) {
                        rollBackPost();
                    };
                },
                buttonsAlign: "center",
            });
        } else {
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
    post: PropTypes.shape({
        // cuid: PropTypes.string.isRequired,
        isEdit: PropTypes.bool.isRequired
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    showDialog: PropTypes.func.isRequired,
    rollBackPost: PropTypes.func.isRequired,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostHeader));