import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import RenderAfterSeconds from '../../../../components/RenderAfterSeconds'; 

import './loginOrRegister.css';

const LoginOrRegister = ({location}) => {
    return (
        <RenderAfterSeconds milliseconds={1000}>
            <div className="login-register-group u-push-right btn-group">
            {
                location.pathname === '/login' ?
                '' : <Link to="/login" className="btn btn-sm btn-secondary btn-login">登入</Link>
            }
            {
                location.pathname === '/register' ? 
                '' : <Link to="/register" className="btn btn-sm btn-primary btn-register">註冊</Link>
            }
            </div>
        </RenderAfterSeconds>
    );
}

LoginOrRegister.proptypes = {
    member: PropTypes.object.isRequired,
}

//export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister);

// 讓LoginOrRegister能使用this.props.location (在shouldComponentUpdate才能調用)
export default withRouter(LoginOrRegister);

// 因為store使用了react-router-redux的middleware, 可以直接從store裡面拿routing.location