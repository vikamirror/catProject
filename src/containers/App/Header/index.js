import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBar, { SearchBarIconBtn } from './SearchBar';
import LoginOrRegister from './LoginOrRegister';
import MemberInfo from './MemberInfo';
import Notification from './Notification';
import { showSearchHeader, initial_header } from '../../../redux/header';

import './header.css';

const mapStateToProps = state => ({
    isSmallDevice: state.isSmallDevice,
    header: state.header,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    showSearchHeader: showSearchHeader
}, dispatch));

class Header extends Component {
    constructor () {
        super();
        this.state = {
            showMiniSearchBar: false,
		};
    }
    showSmallDeviceSearchHeader () {
        this.props.showSearchHeader();
    }
    render() {
        if (this.props.header !== initial_header) {
            return '';
        };
        const header_id = this.props.shoudHeaderColored ? "header-colored" : "";
        return (
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
                            {
                                this.props.isSmallDevice ?
                                <SearchBarIconBtn 
                                    // showMiniSearchBar={this.state.showMiniSearchBar} 
                                    toggleMiniSearchBar={() => this.showSmallDeviceSearchHeader()} 
                                 />
                                :
                                <SearchBar />
                            }
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
        );
    }
}

Header.propTypes = {
    shoudHeaderColored: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);