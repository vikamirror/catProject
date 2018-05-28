import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../../../components/Avatar';
import { showDialog } from '../../../../redux/dialog';
import DropdownMenu from '../../../../components/DropdownMenu';
import MenuItem from '../../../../components/DropdownMenu/DropdownMenuItem';
import BounceInUp from '../../../../components/BounceInUp';
import FadeInOut from '../../../../components/FadeInOut';
import OnBlurListener from '../../../../components/OnBlurListener';
import { logout } from '../../../../redux/member';
import * as sockets from '../../../../sockets/loginOrOut';

import './memberInfo.css';

const mapStateToProps = state => ({
    member: state.member,
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({ 
    showDialog: showDialog,
    logout: logout,
}, dispatch));

class MemberInfo extends Component{
    constructor() {
        super();
        this.state = {
            isShowMenu: false,
        }
    }
    tuggleMenu () {
        this.state.isShowMenu ? 
        this.setState({isShowMenu:false}) : this.setState({isShowMenu:true});
    }
    closeMenu () {
        this.setState({isShowMenu:false});
    }
    showLogoutDialog () {
        this.props.showDialog({
            type: 'question',
            title: '您即將登出',
            htmlString: `<div class="font-size-16 font-blue u-margin-b-8">確定要登出嗎</div>`,
            showCancelButton: true,
            cancelButtonText: "取消",
            showConfirmButton: true,
            confirmButtonText: "登出",
            onClickConfirmButton: (confirmValue) => this.logout(confirmValue),
            buttonsAlign: "center",
        });
    }
    logout (confirmValue) {
        if (confirmValue.confirm) {
            sockets.logoutAllTheOtherDevicesEmitter(this.props.member.cuid);
            this.props.logout();
        }
    }
    render() {
        const { member, isSmallDevice } = this.props;
        const items = [{
            itemType: "link",
            linkTo: "/myPosts",
            hasIcon: true,
            itemIcon: "icon-pencil",
            itemText: "我的貼文"
        },{
            itemType: "link",
            linkTo: "/myFavorites",
            hasIcon: true,
            itemIcon: "icon-heart",
            itemText: "我的關注"
        },{
            itemType: "link",
            linkTo: "#",
            hasIcon: true,
            itemIcon: "icon-user",
            itemText: "帳號設定"
        },{
            itemType: "divider",
            hasIcon: false,
        },{
            itemType: "button",
            clickHandler: () => this.showLogoutDialog(),
            hasIcon: true,
            itemIcon: "icon-logout",
            itemText: "登出",
        }];
        if (member.cuid) {
            return (
                <div tabIndex="0" className="member-info u-clearfix">
                    <OnBlurListener activeFocus={() => this.tuggleMenu()} 
                                    inactiveFocus={() => this.closeMenu()}>
                        <div className="u-push-left">
                            <Avatar avatarUrl={member.avatar} />
                        </div>     
                        <div className="name u-push-right font-grey">
                            {member.name}
                        </div>
                        {
                            isSmallDevice ?
                            <div className="menu-xs">   
                                <DropdownMenu isShowMenu={this.state.isShowMenu}>  
                                    {
                                        items.map((item, index) => (
                                            <MenuItem
                                                index={index}
                                                itemType={item.itemType}
                                                linkTo={item.linkTo || null}
                                                clickHandler={item.clickHandler || null}
                                                hasIcon={item.hasIcon}
                                                itemIcon={item.itemIcon || null}
                                                itemText={item.itemText || null}
                                                divider={item.divider}
                                            />
                                        ))
                                    }
                                </DropdownMenu>
                            </div>
                            // <FadeInOut inCondition={this.state.isShowMenu}>
                            //     <div className="overlay-menu-wrapper z-index-100">
                            //         <div className="container u-margin-header">
                            //             <ul>
                            //                 <li className="overlay-menu__item">
                            //                     <Link to="/myPosts">
                            //                         <div className="icon-btn"><i className="icon icon-pencil" /></div>
                            //                         我的貼文
                            //                     </Link> 
                            //                 </li>
                            //                 <li className="overlay-menu__item">
                            //                     <Link to="#">
                            //                         <div className="icon-btn"><i className="icon icon-heart" /></div>
                            //                         我的關注
                            //                     </Link>
                            //                 </li>
                            //                 <li className="overlay-menu__item">
                            //                     <Link to="#">
                            //                         <div className="icon-btn"><i className="icon icon-user" /></div>
                            //                         帳號設定
                            //                     </Link>
                            //                 </li>
                            //                 <li className="overlay-menu__item">
                            //                     <div onClick={() => this.showLogoutDialog()}>
                            //                         <div className="icon-btn"><i className="icon icon-logout" /></div>
                            //                         登出
                            //                     </div>
                            //                 </li>
                            //             </ul>
                            //         </div>
                            //     </div>
                            // </FadeInOut>
                            :
                            <div className="menu">
                                <DropdownMenu isShowMenu={this.state.isShowMenu}>
                                    {
                                        items.map((item, index) => (
                                            <MenuItem
                                                index={index}
                                                itemType={item.itemType}
                                                linkTo={item.linkTo || null}
                                                clickHandler={item.clickHandler || null}
                                                hasIcon={item.hasIcon}
                                                itemIcon={item.itemIcon || null}
                                                itemText={item.itemText || null}
                                                divider={item.divider}
                                            />
                                        ))
                                    }
                                </DropdownMenu>
                            </div>
                        }
                    </OnBlurListener>
                </div>
            );
        } else {
            return '';
        }
    }
};

MemberInfo.propTypes = {
    showDialog: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberInfo);