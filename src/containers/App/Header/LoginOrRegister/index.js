import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { showLogoutDialog } from '../../../../redux/fullPageDialog';
import RenderAfterSeconds from '../../../../components/RenderAfterSeconds'; 

import './loginOrRegister.css';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (bindActionCreators({ 
    showLogoutDialog: showLogoutDialog 
}, dispatch));


const LoginOrRegister = ({member, pathname}) => {
    if (member.cuid) {
        return '';
    } else {
        return (
            <RenderAfterSeconds milliseconds={1000}>
                <div className="login-register-group u-push-right btn-group">
                {
                    pathname === '/login' ?
                    '' : <Link to="/login" className="btn btn-sm btn-secondary btn-login">登入</Link>
                }
                {
                    pathname === '/register' ? 
                    '' : <Link to="/register" className="btn btn-sm btn-primary btn-register">註冊</Link>
                }
                </div>
            </RenderAfterSeconds>
        );
    }
}

LoginOrRegister.proptypes = {
    member: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister);