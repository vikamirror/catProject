import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ScrollWrapper from '../ScrollWrapper';
import BounceInUp from '../BounceInUp';
import { rollBackPost, clearPost } from '../../redux/post';
import { loadingTrue, loadingFalse } from '../../redux/isLoading';
import { showBlankHeader, showInitialHeader } from '../../redux/header';

import './postWrapper.css';

const CloseButton = ({onClickClose, isSmallDevice}) => {
    return (
        <div className="close-button u-div-center z-index-1" onClick={(e) => onClickClose(e)}>
            <div className="closeCross">
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

const PostEditFooter = ({onClickClose, onClickSubmit}) => (
    <div>
        <hr className="hr-line-style2" />
        <div className="u-clearfix">
            <div className="btn-group u-push-right">     
                <div className="btn btn-sm btn-cancel" onClick={(e) => onClickClose(e)}>關閉</div>
                <div className="btn btn-sm btn-primary" onClick={(e) => onClickSubmit(e)}>送出</div>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({ 
    isSmallDevice: state.isSmallDevice,
    post: state.post,
    isLoading: state.isLoading,
    // routing: state.routing,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    rollBackPost: rollBackPost,
    clearPost: clearPost,
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
    showBlankHeader: showBlankHeader,
    showInitialHeader: showInitialHeader,
}, dispatch));
class PostWrapper extends Component {
    constructor () {
        super();
        this.state = {
            isScroll: false,
        }
    }
    componentDidMount () {
        if (!this.props.post.isFetched) {
            this.props.loadingTrue();
        };
        if (this.props.isSmallDevice) {
            this.props.showBlankHeader();
        };
    }
    componentDidUpdate (prevProps) {
        if (this.props.post.isFetched && (prevProps.post.isFetched !== this.props.post.isFetched)) {
            this.props.loadingFalse();
        };
    }
    handleScroll (isScroll) {
        isScroll ? this.setState({isScroll: true}) : this.setState({isScroll: false});
    }
    handleClose (e) {
        if (this.props.post.cuid && this.props.post.isEdit) {
            this.props.rollBackPost();
        } else {
            e.stopPropagation();
            this.props.history.goBack();
        }
    }
    componentWillUnmount () {
        this.props.clearPost();
        if (this.props.isSmallDevice) {
            this.props.showInitialHeader();
        };
    }
    render () {
        const {isSmallDevice, onClickSubmit} = this.props;
        const {isFetched, isEdit} = this.props.post;
        const shadowHeader = this.state.isScroll ? "shadow-header" : "";
        return (
            <div className="u-wrapper-fixed-w100-h100 u-post-wrapper-scroll z-index-98" id="post-wrapper-id">
                <ScrollWrapper scrollingHandler={(isScroll) => this.handleScroll(isScroll)} wrapperId="post-wrapper-id">
                    <div className={`close-header ${shadowHeader} z-index-1`}>
                        <CloseButton
                            onClickClose={(e) => this.handleClose(e)}
                            isSmallDevice={isSmallDevice}
                        />
                    </div>
                    <BounceInUp inCondition={isFetched} enterMilliseconds={300}>
                        <div className="u-margin-header u-padding-l-8 u-padding-r-8"> 
                            <div className="postWrapper">
                                <article className={`article ${isEdit ? "form" : ""}`} id="articleForm-id">       
                                    {this.props.children}
                                    {
                                        isEdit ? 
                                        <PostEditFooter 
                                            onClickClose={(e) => this.handleClose(e)}
                                            onClickSubmit={(e) => onClickSubmit(e)} 
                                        /> 
                                        : 
                                        ''
                                    }
                                </article>
                            </div>
                        </div>
                    </BounceInUp>
                </ScrollWrapper>
            </div>
        );
    }
}

PostWrapper.propTypes = {
    post: PropTypes.shape({
        isEdit: PropTypes.bool.isRequired,
        isFetched: PropTypes.bool.isRequired
    }),
    isSmallDevice: PropTypes.bool.isRequired,
    onClickSubmit: PropTypes.func,
    rollBackPost: PropTypes.func.isRequired,
};

// 因為要使用history.goBack()
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostWrapper));