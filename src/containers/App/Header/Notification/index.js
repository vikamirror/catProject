import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Transition } from 'react-transition-group';

import DropdownMenu from '../../../../components/DropdownMenu';
import MenuItem from '../../../../components/DropdownMenu/DropdownMenuItem';
import { ellipsisTextAfterMaxLength } from '../../../../Utils/stringFormat';
import OnBlurListener from '../../../../components/OnBlurListener';
import * as sockets from '../../../../sockets/message';
// import BounceInDown from '../../../../components/BounceInDown';

import './notification.css'

const mapStateToProps = state => ({
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
class Notification extends Component {
    constructor() {
        super();
        this.state = {
            isShowNotifications: false,
            bounceInDown: false,
            // notifications: [{
            //     itemType: "link",
            //     linkTo: "#",
            //     hasIcon: false,
            //     itemText: "three" + "回覆給你的訊息：測試訊息要打多長呢？一個問題，說長不長，說短不短，就好比幹話一般，要說得讓測試人員會心一笑是門學問"
            // },{
            //     itemType: "link",
            //     linkTo: "#",
            //     hasIcon: false,
            //     itemText: "one" + "回覆給你的訊息：測試訊息要打多長呢？一個問題，說長不長，說短不短，就好比幹話一般，要說得讓測試人員會心一笑是門學問"
            // }],
            notifications: [],
            notificationsCount: 0,
            couterStyle: {
                opacity: '1',
                transform: 'translateY(0%)'
            }
        }
    }
    componentDidMount () {
        
    }
    componentDidUpdate () {
        if (this.props.member.cuid) {
            sockets.hasUnsentNotifiesEmitter();
            this.onListenReceivedNewMessage();
        }
    }
    onListenReceivedNewMessage () {
        const receivedPostMessageHandler = (newMessage) => {
            const newNotification = {
                itemType: "link",
                linkTo: "#",
                hasIcon: false,
                itemText: `${newMessage.fromMember.name} 回覆給你的訊息: ${newMessage.content}`,
            };
            this.setState({
                notifications: [newNotification, ...this.state.notifications],
                notificationsCount: [newNotification, ...this.state.notifications].length,
            });
        };
        sockets.postMessageListener(receivedPostMessageHandler);
    }
    toggleDropdownMenu () {
        this.state.isShowNotifications ? 
            this.closeDropdownMenu() : this.openDropdownMenu();
    }
    openDropdownMenu () {
        this.setState({
            isShowNotifications: true, // 打開下拉式選單
        });
    }
    closeDropdownMenu () {
        this.setState({
            isShowNotifications: false, // 關閉下拉式選單
            // notifications: [], // 通知的陣列歸零
            notificationsCount: 0, // 通知的數字歸零
        });
    }
    // addOneNotification () {
    //     this.setState({couterStyle: {
    //         ...this.state.couterStyle,
    //         opacity: '0',
    //         transform: 'translateY(-20%)'
    //     }});
    //     this.setState({notifications: [{
    //         itemType: "link",
    //         linkTo: "#",
    //         hasIcon: false,
    //         itemText: "test" + "回覆給你的訊息：測試訊息要打多長呢？一個問題，說長不長，說短不短，就好比幹話一般，要說得讓測試人員會心一笑是門學問"
    //     }, ...this.state.notifications]});
    //     this.execCounterTransition();
    // }
    // execCounterTransition () {

    //     setTimeout(() => {
    //         this.setState({couterStyle: {
    //             ...this.state.couterStyle,
    //             opacity: '1',
    //             transform: 'translateY(0%)'
    //         }});
    //     }, 500);
    // }
    render () {
        if (!this.props.member.cuid) {
            return '';
        }
        const { notificationsCount, notifications, couterStyle } = this.state;
        const Aux = props => props.children;
        return (
            <li className="notify-wrapper">
                <OnBlurListener
                    activeFocus={() => this.toggleDropdownMenu()} 
                    inactiveFocus={() => this.closeDropdownMenu()}
                >
                    <span className="icon-btn"><i className="icon icon-bell" /></span>
                    {
                        notificationsCount > 0 ?
                        <span className="notification-counter" style={couterStyle}>            
                            {notifications.length}
                        </span> 
                        : 
                        null
                    }   
                    <div className="notify-dropdown">
                        <DropdownMenu isShowMenu={this.state.isShowNotifications}>
                            {
                                notifications.length > 0 ?
                                    notifications.map((notify, index) => (
                                        <Aux key={index}>
                                            <MenuItem
                                                itemType={notify.itemType}
                                                linkTo={notify.linkTo || null}
                                                hasIcon={notify.hasIcon}
                                                itemIcon={notify.itemIcon || null}
                                                itemText={ellipsisTextAfterMaxLength(notify.itemText, 36) || null}
                                            />
                                            <MenuItem
                                                itemType="divider"
                                                hasIcon={false}
                                            />
                                        </Aux>
                                    ))
                                    :
                                    <MenuItem
                                        itemType="text"
                                        hasIcon={false}
                                        itemText="您目前沒有新的訊息"
                                    />
                            }
                        </DropdownMenu>
                    </div>
                </OnBlurListener>
            </li>
        );
    }
}
Notification.propTypes = {
    member: PropTypes.shape({
        cuid: PropTypes.string,
    }),
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification);