import * as notifyAPI from '../fetch/notificationAPI';
import * as sockets from '../sockets/notification';

const FETCHED_NOTIFICATION = 'FETCHED_NOTIFICATION';
const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';
const HAS_SEEN = 'HAS_SEEN';
const RESET = 'RESET';
const ACTIVATE_SOCKET_LISTENER = 'ACTIVATE_SOCKET_LISTENER';
const ACTIVATE_FETCH_NOTIFICATION = 'ACTIVATE_FETCH_NOTIFICATION';

const highLightNotifications = (notifies, lastTimeLogout) => {
    let unSeenCount = 0; // 未讀的數量
    const highlightedNotifies = notifies.map((notify, index) => {
        if (Date.parse(notify.dateAdded) > Date.parse(lastTimeLogout)) {
            notify.isHighLight = true;
            unSeenCount++;
            return notify;
        } else {
            notify.isHighLight = false;
            return notify;
        }
    });
    return {
        unSeenCount: unSeenCount,
        highlightedNotifies: highlightedNotifies,
    };
}

// 關閉下拉式選單後, 拿掉加亮的效果
export function notificationsHasBeenSeen () {
    return (dispatch) => {
        dispatch({
            type: HAS_SEEN,
        });
    };
}

// 監聽新的通知
export function onListenNotification () {
    return (dispatch) => {
        dispatch({ type: ACTIVATE_SOCKET_LISTENER });
        const receivedNotifyHandler = (notification) => {
            notification.isHighLight = true;
            dispatch({
                type: UPDATE_NOTIFICATION,
                notification: notification,
            });
        };
        sockets.notificationListener(receivedNotifyHandler);
    };
};

// 向後端請求歷史通知
export function fetchNotifications (lastTimeLogout) {
    return (dispatch) => {
        dispatch({ type: ACTIVATE_FETCH_NOTIFICATION });       
        notifyAPI
            .getNotifications()
            .then(res => {
                const notifies = res.data.notifications;
                // console.log('notifies', notifies);
                const notifyInfo = highLightNotifications(notifies, lastTimeLogout);
                dispatch({
                    type: FETCHED_NOTIFICATION,
                    unSeenNotificationCount: notifyInfo.unSeenCount,
                    notifications: notifyInfo.highlightedNotifies,
                });
            })
            .catch(err => {
                console.error(err.response.data)
                dispatch({
                    type: RESET
                });
            }
        );
    };
};

const initialState = {
    unSeenNotificationCount: 0,
    notifications: [],
    hasActivateNotificationListener: false,
    hasActivateFetch: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTIVATE_FETCH_NOTIFICATION:
            return {
                ...state,
                hasActivateFetch: true,
            };
        case FETCHED_NOTIFICATION:
            return {
                ...state,
                unSeenNotificationCount: action.unSeenNotificationCount,
                notifications: [...action.notifications],
            };
        case ACTIVATE_SOCKET_LISTENER:
            return {
                ...state,
                hasActivateNotificationListener: true,
            };
        case UPDATE_NOTIFICATION:
            return {
                ...state,
                unSeenNotificationCount: state.unSeenNotificationCount + 1,
                notifications: [action.notification, ...state.notifications],
            };
        case HAS_SEEN:
            return {
                ...state,
                unSeenNotificationCount: 0,
                notifications: [...state.notifications].map((notify, index) => {
                    return notify.isHighLight ? {...notify, isHighLight: false} : notify
                })
            };
        case RESET:
            return {
                unSeenNotificationCount: 0,
                notifications: []
            };
        default:
            return state;
    }
};