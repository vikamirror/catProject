import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RenderAfterSeconds from '../../../../components/RenderAfterSeconds'; 

import './loginOrRegister.css';

const mapStateToProps = state => ({
    member: state.member,
    routing: state.routing
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

const LoginOrRegister = ({member, routing}) => {
    if (member.cuid) {
        return '';
    } else {
        return (
            <RenderAfterSeconds milliseconds={1000}>
                <div className="login-register-group u-push-right btn-group">
                {
                    routing.location.pathname === '/login' ?
                    '' : <Link to="/login" className="btn btn-sm btn-secondary btn-login">登入</Link>
                }
                {
                    routing.location.pathname === '/register' ? 
                    '' : <Link to="/register" className="btn btn-sm btn-primary btn-register">註冊</Link>
                }
                </div>
            </RenderAfterSeconds>
        );
    }
}

LoginOrRegister.proptypes = {
    member: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister);

// 讓LoginOrRegister能使用this.props.location (在shouldComponentUpdate才能調用)
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister));

// 因為store使用了react-router-redux的middleware, 可以直接從store裡面拿routing.location