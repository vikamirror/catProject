import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../../../components/Avatar';
import { showDialog } from '../../../../redux/dialog';
import DropdownMenu from '../../../../components/DropdownMenu';
import MenuItem from '../../../../components/DropdownMenu/DropdownMenuItem';
import OnBlurListener from '../../../../components/OnBlurListener';
import { logout } from '../../../../redux/member';
import { resetMyPost } from '../../../../redux/myPosts';
import * as sockets from '../../../../sockets/loginOrOut';

import './memberInfo.css';

const mapStateToProps = state => ({
    member: state.member,
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({ 
    showDialog: showDialog,
    logout: logout,
    resetMyPost: resetMyPost
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
            sockets.logoutEmitter(this.props.member.cuid);
            this.props.logout();
            this.props.resetMyPost();
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
            linkTo: "/myAccount",
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
                <li tabIndex="0" className="member-info u-clearfix">
                    <OnBlurListener activeFocus={() => this.tuggleMenu()} 
                                    inactiveFocus={() => this.closeMenu()}>
                        <div className="u-push-left">
                            <Avatar avatarUrl={member.avatar} />
                        </div>     
                        <div className="name u-push-right font-grey">
                            {member.name}
                        </div>
                        <div className={isSmallDevice ? "menu-xs" : "menu"}>
                            <DropdownMenu isShowMenu={this.state.isShowMenu}>  
                                {
                                    items.map((item, index) => (
                                        <MenuItem
                                            key={index}
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
                    </OnBlurListener>
                </li>
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