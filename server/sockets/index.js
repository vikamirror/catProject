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
            addNotificationHandler,
        } = messageFactory(socket, io);
        
        socket.on('addNotification', addNotificationHandler);

        socket.on('error', (err) => {
            console.error('received error from client:', err);
        });
    });
};

export default ioConnection;

