import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import LoginOrLogout from './LoginOrLogout';

import './header.css';

const mapStateToProps = state => ({ 
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showMiniSearchBar: false,
		};
    }
    toggleMiniSearchBar() {
		this.state.showMiniSearchBar
		? this.setState({ showMiniSearchBar: false })
		: this.setState({ showMiniSearchBar: true });
    }
    render() {
        const header_id = this.props.shoudHeaderColored ? "header-colored" : "";
        return (
            <header className="header z-index-99" id={header_id}>
                <div className="container">
                    <nav className="nav u-expandMargin">
                        <div className="row">
                            {/* Logo */}
                            <div className="u-push-left">
                                <div className="logo">
                                    <Link to="/" className="link">
                                        <img className="image" src="/favicon.ico" alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            {/* 搜尋欄 */}
                            <SearchBar
                                showMiniSearchBar={this.state.showMiniSearchBar}
                                toggleMiniSearchBar={() => this.toggleMiniSearchBar()}
                            />
                            {/* 登入 登出 */}
                            <div className="col-md-4 u-push-right">
                                <LoginOrLogout
                                    cuid={this.props.member.cuid}
                                    pathname={this.props.location.pathname}
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    shoudHeaderColored: PropTypes.bool.isRequired
}

// 讓Header能使用this.props.location (在shouldComponentUpdate才能調用)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));