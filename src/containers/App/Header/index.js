import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FadeInOut from '../../../components/FadeInOut';
import SearchBar from './SearchBar';
import LoginOrRegister from './LoginOrRegister';
import MemberInfo from './MemberInfo';
import Notification from './Notification';
import { initial_header } from '../../../redux/header';

import './header.css';

const mapStateToProps = state => ({
    header: state.header,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const Header = ({header, isScrollDown, location}) => {
    if (header !== initial_header) {
        return '';
    };
    const header_id = isScrollDown ? "" : "header-colored";
    return (
        <FadeInOut inCondition={!isScrollDown} milliseconds={100}>
            <header className="header z-index-97" id={header_id}>
                <div className="container">
                    <nav className="nav u-clearfix">
                        {/* Logo */}
                        <div className="u-push-left">
                            <div className="logo u-padding-t-4 u-padding-b-4">
                                <Link to="/" className="link">
                                    <img className="image" src="/favicon.ico" alt="logo" />
                                </Link>
                            </div>
                        </div>
                        {/* 搜尋欄 */}
                        <div className="searchBar_box u-push-left">
                            <SearchBar />
                        </div>
                        <ul className="right-actions u-push-right u-clearfix">
                            {/* 通知 */}
                            <Notification />
                            {/* 會員中心 */}
                            <MemberInfo />
                            {/* 登入 登出 */}
                            <LoginOrRegister />
                        </ul>
                    </nav>
                </div>
            </header>
        </FadeInOut>
    );
}
 
Header.propTypes = {
    isScrollDown: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));