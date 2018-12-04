import React, { Component } from 'react';

class PostEditFooter extends Component {
    constructor () {
        super();
        this.state = {
            isDisabled: ""
        };
    }
    handleSubmit (e) {
        this.setState({isDisabled: "disabled"});
        this.props.onClickSubmit();
    }
    render () {
        const {isDisabled} = this.state;
        const {onClickCancel} = this.props;
        return (
            <div>
                <hr className="hr-line-style2" />
                <div className="u-clearfix">
                    <div className="btn-group u-push-right">     
                        <div className="btn btn-sm btn-cancel" onClick={(e) => onClickCancel(e)}>取消</div>
                        <div className={`btn btn-sm btn-primary ${isDisabled}`} onClick={(e) => this.handleSubmit(e)}>送出</div>
                    </div>
                </div>
            </div>
        );
    }
};

export default PostEditFooter;