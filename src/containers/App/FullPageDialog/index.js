import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeLogoutDialog } from '../../../redux/fullPageDialog';
import { logout } from '../../../redux/member';

import './fullPageDialog.css';

const mapStateToProps = state => ({ fullPageDialog: state.fullPageDialog });
const mapDispatchToProps = dispatch => (bindActionCreators({
    closeLogoutDialog: closeLogoutDialog,
    logout: logout
}, dispatch));

class FullPageDialog extends React.Component {
    logoutDialog () {
        const reqLogout = () => {
            this.props.logout();
            this.props.history.push('/login');
            this.props.closeLogoutDialog();
        }
        return (
            <div>
                <h3 className="font-white">確定要登出嗎?</h3>
                <div className="btn-group">
                    <button className="btn btn-lg btn-secondary" onClick={() => this.props.closeLogoutDialog()}>取消</button>
                    <button className="btn btn-lg btn-tertiary" onClick={() => reqLogout()}>登出</button>
                </div>
            </div>
        );
    }
    dialogContent () {
        switch(this.props.fullPageDialog.type) {
            case 'LOGOUT_DIALOG':
                return this.logoutDialog();
            default: 
                return <div></div>
        }
    }
    render () {
        const { fullPageDialog } = this.props;
        return (
            <div>
            {
                fullPageDialog.isShow ? 
                <div className="u-wrapper-fixed-w100-h100 z-index-100" id="full_page_msg_wrapper">
                    <div className="u-wrapper-absolute-center u-text-center">
                        {this.dialogContent()}
                    </div>
                </div>
                : 
                ''
            }
            </div>
        );
    }
}

// 使這個Component拿到browser history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPageDialog));