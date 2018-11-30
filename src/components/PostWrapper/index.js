import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BounceInUp from '../BounceInUp';
import { clearPost } from '../../redux/post';
import { showPostHeader, showInitialHeader } from '../../redux/header';
import { showPostBackground, showInitialBackground } from '../../redux/background';

import './postWrapper.css';

const PostEditFooter = ({onClickCancel, onClickSubmit}) => (
    <div>
        <hr className="hr-line-style2" />
        <div className="u-clearfix">
            <div className="btn-group u-push-right">     
                <div className="btn btn-sm btn-cancel" onClick={(e) => onClickCancel(e)}>取消</div>
                <div className="btn btn-sm btn-primary" onClick={(e) => onClickSubmit(e)}>送出</div>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    clearPost: clearPost,
    showPostHeader: showPostHeader,
    showInitialHeader: showInitialHeader,
    showPostBackground: showPostBackground,
    showInitialBackground: showInitialBackground,
}, dispatch));
class PostWrapper extends Component {
    componentDidMount () {
        this.props.showPostHeader();
        this.props.showPostBackground();
    }
    componentWillUnmount () {
        this.props.clearPost();
        this.props.showInitialHeader();
        this.props.showInitialBackground();
    }
    render () {
        const { onClickSubmit, onClickCancel } = this.props;
        const { isFetched, isEdit } = this.props.post;
        return (               
            <BounceInUp inCondition={isFetched} enterMilliseconds={300}>
                <div className="u-padding-t-16 u-margin-footer" id="post-wrapper-id">
                    <div className="postWrapper">
                        <article className={`article ${isEdit ? "form" : ""}`} id="articleForm-id">       
                            {this.props.children}
                            {
                                isEdit ? 
                                <PostEditFooter 
                                    onClickCancel={(e) => onClickCancel(e)}
                                    onClickSubmit={(e) => onClickSubmit(e)} 
                                /> 
                                : 
                                ''
                            }
                        </article>
                    </div>
                </div>
            </BounceInUp>
        );
    }
}

PostWrapper.propTypes = {
    post: PropTypes.shape({
        isEdit: PropTypes.bool.isRequired,
        isFetched: PropTypes.bool.isRequired,
    }),
};

// 因為要使用history.goBack()
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostWrapper));