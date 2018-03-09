import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../../../components/Avatar';
import { showLogoutDialog } from '../../../../redux/fullPageDialog';
import BounceInUp from '../../../../components/BounceInUp';
import FadeInOut from '../../../../components/FadeInOut';

import './memberInfo.css';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (bindActionCreators({ 
    showLogoutDialog: showLogoutDialog 
}, dispatch));

class MemberInfo extends Component{
    constructor() {
        super();
        this.state = {
            isShowMenu: false,
            isSmallDevice: false,
        }
    }
    componentDidMount() {
        window.innerWidth < 768 ? this.setState({isSmallDevice: true}) : this.setState({isSmallDevice: false});
    }
    tuggleMenu() {
        this.state.isShowMenu ? 
        this.setState({isShowMenu:false}) : this.setState({isShowMenu:true});
    }
    closeMenu() {
        this.setState({isShowMenu:false});
    }
    render() {
        const { member } = this.props;
        if (member.cuid) {
            return (
                <div tabIndex="0" className="member-info u-clearfix" 
                     onClick={() => this.tuggleMenu()} 
                     onBlur={() => this.closeMenu()}
                >
                    <div className="u-push-left">
                        <Avatar avatarUrl={member.avatar} />
                    </div>     
                    <div className="name u-push-right font-grey">
                        {member.name}
                    </div>
                    {
                        this.state.isSmallDevice ? 
                        <FadeInOut inCondition={this.state.isShowMenu}>
                            <div className="overlay-menu-wrapper z-index-100">
                                <div className="container u-margin-header">
                                    <ul>
                                        <li className="overlay-menu__item">
                                            <Link to="#">
                                                <div className="icon-btn"><i className="icon icon-pencil" /></div>
                                                我的貼文
                                            </Link> 
                                        </li>
                                        <li className="overlay-menu__item">
                                            <Link to="#">
                                                <div className="icon-btn"><i className="icon icon-heart" /></div>
                                                我的關注
                                            </Link>
                                        </li>
                                        <li className="overlay-menu__item">
                                            <Link to="#">
                                                <div className="icon-btn"><i className="icon icon-user" /></div>
                                                帳號設定
                                            </Link>
                                        </li>
                                        <li className="overlay-menu__item">
                                            <div onClick={() => this.props.showLogoutDialog()}>
                                                <div className="icon-btn"><i className="icon icon-logout" /></div>
                                                登出
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </FadeInOut>
                        :
                        <div className="dropdown-menu-wrapper">
                            <BounceInUp inCondition={this.state.isShowMenu}>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="#">
                                            <div className="icon-btn"><i className="icon icon-pencil" /></div>
                                            我的貼文
                                        </Link> 
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="icon-btn"><i className="icon icon-heart" /></div>
                                            我的關注
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#">
                                            <div className="icon-btn"><i className="icon icon-user" /></div>
                                            帳號設定
                                        </Link>
                                    </li>
                                    <hr className="hr-line-style1" />
                                    <li>
                                        <div onClick={() => this.props.showLogoutDialog()}>
                                            <div className="icon-btn"><i className="icon icon-logout" /></div>
                                            登出
                                        </div>
                                    </li>           
                                </ul>
                            </BounceInUp>  
                        </div>
                    }
                </div>
            );
        } else {
            return '';
        }
    }
};

MemberInfo.propTypes = {
    showLogoutDialog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfo);