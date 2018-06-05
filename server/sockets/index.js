import loginAndOutFactory from './loginOrOut';
import PostFactory from './post';
import messageFactory from './message';

const ioConnection = (io) => {

    io.on('connection', (socket) => {

        const {
            loginHandler,
            logoutAllTheOtherDevicesHandler,
            logoutHandler,
            disconnectHandler,
        } = loginAndOutFactory(socket);
        
        socket.on('login', loginHandler);
        socket.on('logoutAllTheOtherDevices', logoutAllTheOtherDevicesHandler);
        socket.on('logout', logoutHandler);
        socket.on('disconnect', disconnectHandler);

        const {
            addPostListBroadcastHandler,
            updatePostListBroadcastHandler,
            deletePostListBroadcastHandler,
        } = PostFactory(socket);

        socket.on('addPostListBroadcast', addPostListBroadcastHandler);
        socket.on('updatePostListBroadcast', updatePostListBroadcastHandler);
        socket.on('deletePostListBroadcast', deletePostListBroadcastHandler);

        const {
            postMessageNotifyHandler,
            unsentNotifiesHandler
        } = messageFactory(socket, io);
        
        socket.on('notifyNewPostMessage', postMessageNotifyHandler);
        socket.on('hasUnsentNotifies', unsentNotifiesHandler);

        socket.on('error', (err) => {
            console.error('received error from client:', err);
        });
    });
};

export default ioConnection;

