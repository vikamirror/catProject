import loginAndOutFactory from './loginOrOut';
import PostFactory from './post';

const socketsOfLoginAndOut = (io) => {
    io.on('connection', (socket) => {
        console.log('已有client連線');

        const {
            loginHandler,
            logoutAllTheOtherDevicesHandler,
        } = loginAndOutFactory(socket);
        
        socket.on('login', loginHandler);
        socket.on('logoutAllTheOtherDevices', logoutAllTheOtherDevicesHandler);

        const {
            addPostListBroadcastHandler,
            updatePostListBroadcastHandler,
            deletePostListBroadcastHandler,
        } = PostFactory(socket);

        socket.on('addPostListBroadcast', addPostListBroadcastHandler);
        socket.on('updatePostListBroadcast', updatePostListBroadcastHandler);
        socket.on('deletePostListBroadcast', deletePostListBroadcastHandler);

        socket.on('error', (err) => {
            console.error('received error from client:', err);
        });
    });
};

export default socketsOfLoginAndOut;

