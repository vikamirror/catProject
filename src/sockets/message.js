import socket from './index';

// tag對象, 留言內容, 發送給server端
export const postMessageEmitter = (newMessage) => {
    socket.emit('notifyNewPostMessage', newMessage);
};

// 收到tag自己的留言內容
export const postMessageListener = (receivedPostMessageHandler) => {
    socket.on('receivedNewPostMessage', (newMessage) => {
        receivedPostMessageHandler(newMessage);
    });
};

// 問後端有沒有新的tag
export const hasUnsentNotifiesEmitter = () => {
    socket.emit('hasUnsentNotifies');
};