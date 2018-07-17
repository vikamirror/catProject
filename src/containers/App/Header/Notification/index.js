import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import DropdownMenu from '../../../../components/DropdownMenu';
import MenuItem from '../../../../components/DropdownMenu/DropdownMenuItem';
import OnBlurListener from '../../../../components/OnBlurListener';
// import * as sockets from '../../../../sockets/notification';
import { onListenNotification, fetchNotifications, notificationsHasBeenSeen } from '../../../../redux/notification';

// import * as notifyAPI from '../../../../fetch/notificationAPI';

import './notification.css'

const mapStateToProps = state => ({
    member: state.member,
    notification: state.notification,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    onListenNotification: onListenNotification,
    fetchNotifications: fetchNotifications,
    notificationsHasBeenSeen: notificationsHasBeenSeen,
}, dispatch));
class Notification extends Component {
    constructor() {
        super();
        this.state = {
            isShowNotifications: false,
            bounceInDown: false,
        };
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.member.cuid && !this.props.notification.hasActivateNotificationListener) {
            this.props.onListenNotification(); // 監聽新的通知
        };
        if (this.props.member.lastTimeLogout && !this.props.notification.hasActivateFetch) {
            this.props.fetchNotifications(this.props.member.lastTimeLogout); // 向後端請求歷史通知
        };
        if (this.props.notification.unSeenNotificationCount !== prevProps.notification.unSeenNotificationCount) {
            this.execCounterTransition();
        };
    }
    // 下拉式選單
    toggleDropdownMenu () {
        this.state.isShowNotifications ? this.closeDropdownMenu() : this.openDropdownMenu();
    }
    // 打開下拉式選單
    openDropdownMenu () {   
        this.setState({isShowNotifications: true});
    }
    // 關閉下拉式選單
    closeDropdownMenu () {
        this.setState({isShowNotifications: false});
        this.props.notificationsHasBeenSeen();
    }
    // 啟動計數器的動畫
    execCounterTransition () {
        this.setState({bounceInDown: true});
        setTimeout(() => {
            this.setState({bounceInDown: false});
        }, 200);
    }
    render () {
        const { bounceInDown } = this.state;
        const { notifications, unSeenNotificationCount } = this.props.notification;
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
                    <span className="icon-btn"><i className="icon icon-envelope-open-o" /></span> 
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
        lastTimeLogout: PropTypes.string,
    }),
    notification: PropTypes.shape({
        notifications: PropTypes.array.isRequired,
        unSeenNotificationCount: PropTypes.number.isRequired,
    }),
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification));