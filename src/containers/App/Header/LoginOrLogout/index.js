import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showLogoutDialog } from '../../../../redux/fullPageDialog';

import './loginOrLogout.css';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (bindActionCreators({ 
    showLogoutDialog: showLogoutDialog 
}, dispatch));

function toLogin(pathname) {
    return (
        <div className="toLogin">
            {
                pathname === '/login' ? 
                '' : <Link to="/login" className="btn btn-sm btn-secondary">登入</Link>
            }
            {
                pathname === '/register' ? 
                '' : <Link to="/register" className="btn btn-sm btn-primary">註冊</Link>
            }
        </div>
    );
}

function toLogout(showLogoutDialog) {
    // return <Link to="/register" className="btn btn-sm btn-tertiary">登出</Link>;
    return <button className="btn btn-sm btn-tertiary" onClick={() => showLogoutDialog()}>登出</button>
}

function LoginOrLogout(props) {
    const { cuid, pathname, showLogoutDialog } = props;
    return (
        <div className="login-register-group u-push-right btn-group">
            {
                cuid === '' ? toLogin(pathname) : toLogout(showLogoutDialog)
            }
        </div>
    );
}

LoginOrLogout.proptypes = {
    cuid: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    showLogoutDialog: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrLogout);