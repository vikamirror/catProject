import socket from './index';

// 通知server端已新增一個notification
export const addNotificationEmitter = (notifyData) => {
    socket.emit('addNotification', notifyData);
};

// 收到tag自己的留言內容
export const notificationListener = (receivedNotifyHandler) => {
    socket.on('receivedNewNotification', (notifyCuid) => {
        receivedNotifyHandler(notifyCuid);
    });
};

// 收到上一次登出/斷線的時間
export const lastLogoutTimeListener = (receivedLastLogoutTimeHandler) => {
    socket.on('lastLogoutTime', (time) => {
        receivedLastLogoutTimeHandler(time);
    });
};