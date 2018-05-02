import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import SearchBar from './SearchBar';
import LoginOrRegister from './LoginOrRegister';
import MemberInfo from './MemberInfo';

import './header.css';

const SearchBarIconBtn = ({showMiniSearchBar, toggleMiniSearchBar}) => (
    <div className="u-push-left">
        <div className="searchBar__xs__icon">
            <div
                className={showMiniSearchBar ? 'icon-btn active' : 'icon-btn'}
                onClick={() => toggleMiniSearchBar()}
            >
                <i className="icon icon-search" />
            </div>
        </div>
    </div>
);
SearchBarIconBtn.propTypes = {
    showMiniSearchBar: PropTypes.bool.isRequired,
    toggleMiniSearchBar: PropTypes.func.isRequired
};

const SearchBarLarge = () => (
    <div className="col-sm-5 col-md-5 u-clearPadding">
        <div className="searchBar">
            <form className="form search-form-field icon-search">
                <input type="text"  />
            </form>
        </div>
    </div>
);

const SearchBarSmall = () => (
    <div className="col-sm-5 col-md-5 u-clearPadding">
        <div className="searchBar">
            <form className="form search-form-field icon-search">
                <input type="text" autoFocus />
            </form>
        </div>
    </div>
);

const mapStateToProps = state => ({
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

class Header extends Component {
    constructor () {
        super();
        this.state = {
            showMiniSearchBar: false,
		};
    }
    toggleMiniSearchBar () {
		this.state.showMiniSearchBar ? 
        this.setState({ showMiniSearchBar: false })
        : 
        this.setState({ showMiniSearchBar: true });
    }
    render() {
        const header_id = this.props.shoudHeaderColored ? "header-colored" : "";
        return (
            <header className="header z-index-98" id={header_id}>
                <div className="container">
                    <nav className="nav u-clearfix">
                        {/* Logo */}
                        <div className="u-push-left">
                            <div className="logo u-padding-t-8 u-padding-b-8">
                                <Link to="/" className="link">
                                    <img className="image" src="/favicon.ico" alt="logo" />
                                </Link>
                            </div>
                        </div>
                        {/* 搜尋欄 */}
                        <div className="searchBar_box">
                            {
                                this.props.isSmallDevice ?
                                <SearchBarIconBtn 
                                    showMiniSearchBar={this.state.showMiniSearchBar} 
                                    toggleMiniSearchBar={() => this.toggleMiniSearchBar()} 
                                 />
                                :
                                <SearchBarLarge />
                            }
                        </div>
                        <div className="u-push-right">
                            {/* 會員中心 */}
                            <MemberInfo />
                            {/* 登入 登出 */}
                            <LoginOrRegister />
                        </div>
                        {/* 螢幕<768, 按下SearchBarIconBtn後, 彈出的搜尋框 */}
                    </nav>
                    {
                        this.state.showMiniSearchBar ?
                        <SearchBarSmall />
                        :
                        ''
                    }
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    shoudHeaderColored: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);