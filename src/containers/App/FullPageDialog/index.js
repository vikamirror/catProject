import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeFullPageDialog, showInputDialog } from '../../../redux/fullPageDialog';
import { logout } from '../../../redux/member';
import { ErrorAlert } from '../../../components/TopAlert';
import InputDialog from './InputDialog';

import './fullPageDialog.css';

const mapStateToProps = state => ({ fullPageDialog: state.fullPageDialog });
const mapDispatchToProps = dispatch => (bindActionCreators({
    closeFullPageDialog: closeFullPageDialog,
    logout: logout,
    showInputDialog: showInputDialog,
}, dispatch));

class FullPageDialog extends React.Component {
    logoutDialog () {
        const reqLogout = () => {
            this.props.logout();
            this.props.history.push('/login');
            this.props.closeFullPageDialog();
        }
        return (
            <div className="u-wrapper-absolute-center u-text-center">
                <h3 className="font-white">確定要登出嗎?</h3>
                <div className="btn-group">
                    <button className="btn btn-lg btn-secondary" onClick={() => this.props.closeFullPageDialog()}>取消</button>
                    <button className="btn btn-lg btn-tertiary" onClick={() => reqLogout()}>登出</button>
                </div>
            </div>
        );
    }
    topErrorAlert () {
        return (
            <ErrorAlert errorMsg={this.props.fullPageDialog.message} />
        );  
    }
    dialogContent () {
        switch(this.props.fullPageDialog.type) {
            case 'LOGOUT_DIALOG':
                return this.logoutDialog();
            case 'ERROR_ALERT':
                return this.topErrorAlert();
            case 'INPUT_DIALOG':
                return <InputDialog 
                            title={this.props.fullPageDialog.title}
                            text={this.props.fullPageDialog.text}
                        />;
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
                <div className="u-wrapper-fixed-w100-h100 z-index-100 u-div-outline-0" id="full_page_msg_wrapper">
                    {this.dialogContent()}
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