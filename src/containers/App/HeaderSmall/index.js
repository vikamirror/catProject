import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FadeInOut from '../../../components/FadeInOut';
import SearchButton from './SearchButton';

import { showSearchHeader, initial_header } from '../../../redux/header';
import MemberInfo from '../Header/MemberInfo';

import '../Header/header.css';

const mapStateToProps = state => ({
    header: state.header,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    showSearchHeader: showSearchHeader
}, dispatch));
const HeaderSmall = ({isScrollDown, header, showSearchHeader, location}) => {
    if (header !== initial_header) {
        return '';
    };
    const isShowSearchButton = () => {
        if (location.pathname === "/myPosts" ||
            location.pathname === "/myFavorites" ||
            location.pathname === "/myAccount") {
            return false;
        } else {
            return true;
        }
    };
    return (
        <FadeInOut inCondition={!isScrollDown} milliseconds={100}>
            <header className="header z-index-97" id="header-colored">
                <div className="container">
                    <nav className="nav u-clearfix">
                        {/* 搜尋icon */}
                        <div className="searchBar_box u-push-left">
                            {
                                isShowSearchButton() ? 
                                <SearchButton clickHandler={() => showSearchHeader()} /> : ''
                            }
                        </div>
                        <ul className="right-actions u-push-right">
                            {/* 會員中心 */}
                            <MemberInfo />
                        </ul>
                    </nav>
                </div>
            </header>
        </FadeInOut>
    );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSmall));