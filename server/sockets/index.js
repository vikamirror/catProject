import socketioJwt from 'socketio-jwt';

import loginAndOutFactory from './loginOrOut';
import PostFactory from './post';
import messageFactory from './message';

const socketsOfLoginAndOut = (io) => {
    io.use(socketioJwt.authorize({
        secret:
    }));
    io.on('connection', (socket) => {
        // console.log('已有client連線');

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
        } = messageFactory(socket);
        
        socket.on('notifyNewPostMessage', postMessageNotifyHandler);

        socket.on('error', (err) => {
            console.error('received error from client:', err);
        });
    });
};

export default socketsOfLoginAndOut;

