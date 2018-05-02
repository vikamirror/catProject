import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BounceInUp from '../BounceInUp';
// import RenderAfterSeconds from '../RenderAfterSeconds';

import './postWrapper.css';

const CloseButton = ({onClickClose, isSmallDevice}) => {
    return (
        <div className="close-button u-div-center z-index-1" onClick={() => onClickClose()}>
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
                <div className="btn btn-sm btn-cancel" onClick={() => onClickClose()}>關閉</div>
                <div className="btn btn-sm btn-primary" onClick={() => onClickSubmit()}>送出</div>
            </div>
        </div>
    </div>
);

const mapStateToProps = state => ({ 
    isSmallDevice: state.isSmallDevice
});
const mapDispatchToProps = dispatch => (bindActionCreators({ }, dispatch));
class PostWrapper extends Component {
    constructor () {
        super();
        this.state = {
            bounceInUp: false,
            isScroll: false,
        }
    }
    componentDidMount () {
        document.getElementById("post-wrapper-id").addEventListener("scroll", evt => this.handleScroll(evt));
        this.setState({bounceInUp: true});
    }
    componentWillUnmount () {
        document.getElementById("post-wrapper-id").removeEventListener("scroll", evt => this.handleScroll(evt));
    }
    handleScroll (isScroll) {
        if(document.body.scrollTop > 0 || document.getElementById("post-wrapper-id").scrollTop > 0){
            this.setState({isScroll: true});
        } else {
            this.setState({isScroll: false});
        }
    }
    render () {
        const {isEdit, isFetched, children, onClickClose, onClickSubmit, isSmallDevice} = this.props;
        const shadowHeader = this.state.isScroll ? "shadow-header" : "";
        return (  
            <div className="u-wrapper-fixed-w100-h100 u-post-wrapper-scroll z-index-99" id="post-wrapper-id">
                <div className={`close-header ${shadowHeader} z-index-1`}>
                    <CloseButton 
                        onClickClose={() => onClickClose()}
                        isSmallDevice={isSmallDevice}
                    />
                </div>
                <BounceInUp inCondition={isFetched} enterMilliseconds={300}>
                    <div className="u-margin-header u-margin-footer u-padding-l-8 u-padding-r-8"> 
                        <div className="postWrapper">
                            <article className={`container article ${isEdit ? "form" : ""}`}>       
                                {children}
                                {
                                    isEdit ? 
                                    <PostEditFooter 
                                        onClickClose={() => onClickClose()}
                                        onClickSubmit={() => onClickSubmit()} 
                                    /> 
                                    : 
                                    ''
                                }
                            </article>
                        </div>
                    </div>
                </BounceInUp>
            </div>
        );
    }
}

PostWrapper.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired,
    onClickClose: PropTypes.func.isRequired,
    onClickSubmit: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(PostWrapper);