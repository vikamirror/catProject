import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MenuItem from '../../../../components/DropdownMenu/DropdownMenuItem';
import { onListenNotification, fetchNotifications, notificationsHasBeenSeen } from '../../../../redux/notification';
import { showGoBackHeader, showInitialHeader } from '../../../../redux/header';

const mapStateToProps = state => ({
    member: state.member,
    notification: state.notification,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    onListenNotification: onListenNotification,
    fetchNotifications: fetchNotifications,
    notificationsHasBeenSeen: notificationsHasBeenSeen,
    showGoBackHeader: showGoBackHeader,
    showInitialHeader: showInitialHeader,
}, dispatch));
class NotificationsSM extends Component {
    componentDidMount () {
        this.props.showGoBackHeader();
    }
    componentWillUnmount () {
        this.props.showInitialHeader();
    }
    render () {
        const { notifications } = this.props.notification;
        const Aux = props => props.children;
        return (
            <div className="sm-notifications">
                <div className="u-margin-header">
                    <div className="container u-padding-t-16">
                        <ul>
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
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
NotificationsSM.propTypes = {
    member: PropTypes.shape({
        cuid: PropTypes.string,
    }),
    notification: PropTypes.shape({
        notifications: PropTypes.array.isRequired,
        unSeenNotificationCount: PropTypes.number.isRequired,
    }),
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSM);