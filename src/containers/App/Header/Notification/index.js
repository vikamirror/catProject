import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

import DropdownMenu from '../../../../components/DropdownMenu';
import MenuItem from '../../../../components/DropdownMenu/DropdownMenuItem';
import OnBlurListener from '../../../../components/OnBlurListener';
import * as sockets from '../../../../sockets/notification';

import * as notifyAPI from '../../../../fetch/notificationAPI';

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
            notifications: [],
            lastLogoutTime: '', // 上次登出時間
            unSeenNotificationCount: 0, //未讀的消息
            hasActivateSocket: false, // 已開始監聽
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.member.cuid && !this.state.hasActivateSocket) {
            this.onListenNotification(); // 監聽新的通知
            this.onListenLastLogoutTime(); // 監聽上次登出時間
            this.setState({hasActivateSocket: true});
            this.fetchNotifications(); // 向後端請求歷史通知
        }
    }
    // 監聽新的通知
    onListenNotification () {
        const receivedNotifyHandler = (notification) => {
            // console.log('receivedNotifyHandler:', notification);
            notification.isHighLight = true;
            this.setState({
                notifications: [notification, ...this.state.notifications],
                unSeenNotificationCount: this.state.unSeenNotificationCount + 1
            });
            this.execCounterTransition();
        };
        sockets.notificationListener(receivedNotifyHandler);
    }
    // 監聽上次登出時間
    onListenLastLogoutTime () {
        const receivedLastLogoutTimeHandler = (time) => {
            this.setState({lastLogoutTime: time});
        }
        sockets.lastLogoutTimeListener(receivedLastLogoutTimeHandler);
    }
    // 向後端請求歷史通知
    fetchNotifications () {
        notifyAPI
            .getNotifications()
            .then(res => {
                const notifies = res.data.notifications;
                this.highLightNotifications(notifies);
            })
            .catch( err => console.error(err.response.data) );
    }
    // 將未讀的通知加亮
    highLightNotifications (notifies) {
        let unSeenCount = 0; // 未讀的數量
        notifies.map((notify, index) => {
            if (Date.parse(notify.dateAdded) > Date.parse(this.state.lastLogoutTime)) {
                notify.isHighLight = true;
                unSeenCount++;
                return notify;
            } else {
                notify.isHighLight = false;
                return notify;
            }
        });
        this.setState({
            notifications: notifies,
            unSeenNotificationCount: unSeenCount
        });
        this.execCounterTransition();
    }
    // 開關下拉式選單
    toggleDropdownMenu () {
        this.state.isShowNotifications ? 
            this.closeDropdownMenu() : this.openDropdownMenu();
    }
    // 打開下拉式選單
    openDropdownMenu () {
        this.setState({
            isShowNotifications: true,
        });
    }
    // 關閉下拉式選單
    closeDropdownMenu () {
        this.setState({
            isShowNotifications: false, 
            unSeenNotificationCount: 0, // 未讀的數字歸零
        });
        this.removeHighLights();
    }
    // 關閉下拉式選單後, 拿掉加亮的效果
    removeHighLights () {
        const notifiesClearHighLight = [...this.state.notifications].map((notify, index) => {
            if (notify.isHighLight) {
                return {
                    ...notify,
                    isHighLight: false
                };
            } else {
                return notify;
            }
        });
        this.setState({notifications: notifiesClearHighLight});
    }
    // 啟動計數器的動畫
    execCounterTransition () {
        this.setState({bounceInDown: true});
        setTimeout(() => {
            this.setState({bounceInDown: false});
        }, 200);
    }
    render () {
        if (!this.props.member.cuid) {
            return '';
        }
        const { notifications, unSeenNotificationCount, bounceInDown } = this.state;
        const defaultStyles = {
            transition: 'all 200ms cubic-bezier(0.215, 0.610, 0.355, 1.000)',
            opacity: unSeenNotificationCount ? '1' : '0',
            transform: 'translateY(0%)'
        };
        const transitionStyles = {
            entering: { opacity: '0', transform: 'translateY(-10%)'},
            entered: { opacity: '1', transform: 'translateY(0%)'},
        }
        const Aux = props => props.children;
        return (
            <li className="notify-wrapper">
                {/* <button className="btn btn-sm" onClick={() => this.addOneNotification()}>+1</button> */}
                <OnBlurListener
                    activeFocus={() => this.toggleDropdownMenu()} 
                    inactiveFocus={() => this.closeDropdownMenu()}
                >
                    <span className="icon-btn"><i className="icon icon-bell" /></span> 
                    <Transition in={bounceInDown} timeout={300}>
                    {
                        (status) => (
                            <div style={{...defaultStyles, ...transitionStyles[status]}}>
                                <span className="notification-counter">
                                    {unSeenNotificationCount}
                                </span>
                            </div>
                        )
                    }
                    </Transition>
                    <div className="notify-dropdown">
                        <DropdownMenu isShowMenu={this.state.isShowNotifications}>
                            {
                                notifications.length > 0 ?
                                    notifications.map((notify, index) => (
                                        <Aux key={index}>
                                            <MenuItem
                                                itemType="notification"
                                                linkTo={notify.link}
                                                boldText={notify.messageFrom.name}
                                                itemText={notify.message}
                                                date={notify.dateAdded}
                                                isHighLight={notify.isHighLight}
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