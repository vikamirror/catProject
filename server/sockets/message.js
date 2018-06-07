export default function messageFactory (socket, io) {
    // 收到一則新的message, 包括tag對象, 留言內容
    const addNotificationHandler = (data) => {
        if (!data.notification || !data.notifyTo) {
            return;
        }
        const member = data.notifyTo;
        const isMemberOnline = io.sockets.adapter.rooms[member];

        if (isMemberOnline) {
            // 如果該會員在線上, 將新的notification傳給member
            socket.broadcast.to(member).emit('receivedNewNotification', data.notification); // 通知被tagged的member
        }
    };

    return {
        addNotificationHandler,
    };
}